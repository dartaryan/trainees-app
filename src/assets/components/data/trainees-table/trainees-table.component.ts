import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Trainee } from '../trainees/trainee.interface';
import { TraineeDataService } from '../trainee-data.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-trainees-table',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, AsyncPipe, NgIf, DatePipe],
    templateUrl: './trainees-table.component.html',
    styleUrl: './trainees-table.component.scss'
})
export class TraineesTableComponent implements OnInit {
    isEditMode: boolean = false;
    public displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
    public dataSource = new MatTableDataSource<Trainee>([]);
    public selectedTrainee: Trainee | null = null;

    constructor(private traineeDataService: TraineeDataService) {}

    private _paginator!: MatPaginator;

    @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
        if (value) {
            this._paginator = value;
            this.dataSource.paginator = this._paginator;
        }
    }

    ngOnInit(): void {
        this.traineeDataService.trainees$.subscribe(trainees => {
            this.dataSource.data = trainees;
            this.paginator && this.paginator.firstPage();
        });
        this.traineeDataService.selectedTrainee$.subscribe(selectedTrainee => this.selectedTrainee = selectedTrainee)
        this.traineeDataService.isEditMode$.subscribe((editMode => this.isEditMode = editMode))
    }

    onSelect(trainee: Trainee): void {
        if (!this.isEditMode) {
            this.selectedTrainee = this.selectedTrainee === trainee ? null : trainee;
            this.traineeDataService.selectTrainee(this.selectedTrainee);
        }
    }
}
