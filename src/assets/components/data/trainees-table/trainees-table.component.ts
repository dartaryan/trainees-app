import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Trainee } from '../trainees/trainee.interface';
import { TraineeDataService } from '../trainee-data.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-trainees-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, AsyncPipe, NgIf, DatePipe],
    templateUrl: './trainees-table.component.html',
    styleUrl: './trainees-table.component.scss'
})
export class TraineesTableComponent implements OnInit, OnDestroy {
    public isEditMode: boolean = false;
    public displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
    public dataSource = new MatTableDataSource<Trainee>([]);
    public selectedTrainee: Trainee | null = null;
    private unsubscribe$ = new Subject<void>();

    constructor(private traineeDataService: TraineeDataService) {}

    private _paginator!: MatPaginator;

    @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
        if (value) {
            this._paginator = value;
            this.dataSource.paginator = this._paginator;
        }
    }

    ngOnInit(): void {
        this.traineeDataService.trainees$.pipe(takeUntil(this.unsubscribe$)).subscribe(trainees => {
            this.dataSource.data = trainees;
            this.paginator && this.paginator.firstPage();
        });

        this.traineeDataService.selectedTrainee$.pipe(takeUntil(this.unsubscribe$)).subscribe(selectedTrainee => {
            this.selectedTrainee = selectedTrainee;
        });

        this.traineeDataService.isEditMode$.pipe(takeUntil(this.unsubscribe$)).subscribe(editMode => {
            this.isEditMode = editMode;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onSelect(trainee: Trainee): void {
        if (!this.isEditMode) {
            this.selectedTrainee = this.selectedTrainee?.serialNumber === trainee.serialNumber ? null : trainee;
            this.traineeDataService.selectTrainee(this.selectedTrainee);
        }
    }
}
