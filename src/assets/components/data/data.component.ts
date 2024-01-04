import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { TraineesTableComponent } from './trainees-table/trainees-table.component';
import { TraineeDetailsComponent } from './trainee-details/trainee-details.component';
import { Trainee } from './trainees/trainee.interface';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [MatTableModule, ActionToolbarComponent, TraineesTableComponent, TraineeDetailsComponent],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent {
    selectedTrainee: Trainee | null = null

    onTraineeSelected(trainee: Trainee): void {
        console.log("onTraineeSelected",trainee)
        this.selectedTrainee = trainee;
    }
}
