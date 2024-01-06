import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { TraineesTableComponent } from './trainees-table/trainees-table.component';
import { TraineeDetailsComponent } from './trainee-details/trainee-details.component';
import { TableToolbarComponent } from './action-toolbar/table-toolbar/table-toolbar.component';
import { Trainee } from './trainees/trainee.interface';
import { TraineeDataService } from './trainee-data.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [MatTableModule, ActionToolbarComponent, TraineesTableComponent, TraineeDetailsComponent, TableToolbarComponent, NgIf, AsyncPipe],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit {

    constructor(private traineeDataService: TraineeDataService) {}

    ngOnInit() {
    }

    onAddTrainee(): void {
        const newTrainee: Trainee = {
            id: 0,
            name: '--',
            date: '--',
            grade: 0,
            subject: '--',
            email: '--',
            address: '--',
            city: '--',
            country: '--',
            zip: 0,
            serialNumber: 0
        };

        this.traineeDataService.addTrainee(newTrainee);
        this.traineeDataService.setEditMode(true);
    }
}
