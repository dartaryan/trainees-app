import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Trainee } from '../trainees/trainee.interface';
import { TraineeDataService } from '../trainee-data.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-trainees-table',
    standalone: true,
    imports: [MatTableModule, AsyncPipe, NgIf, DatePipe],
    templateUrl: './trainees-table.component.html',
    styleUrl: './trainees-table.component.scss'
})
export class TraineesTableComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
    trainees$: Observable<Trainee[]> = of([])
    selectedTrainee: Trainee | null = null;

    constructor(private traineeDataService: TraineeDataService) {}

    ngOnInit(): void {
        this.trainees$ = this.traineeDataService.trainees$;
    }

    onSelect(trainee: Trainee): void {
        this.selectedTrainee = this.selectedTrainee === trainee ? null : trainee
        this.traineeDataService.selectTrainee(this.selectedTrainee);
    }
}
