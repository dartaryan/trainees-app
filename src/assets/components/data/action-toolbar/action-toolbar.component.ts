import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TraineeDataService } from '../trainee-data.service';
import { FormsModule } from '@angular/forms';
import { Trainee } from '../trainees/trainee.interface';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { DetailsToolbarComponent } from './details-toolbar/details-toolbar.component';

@Component({
    selector: 'app-action-toolbar',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, AsyncPipe, NgIf, TableToolbarComponent, DetailsToolbarComponent],
    templateUrl: './action-toolbar.component.html',
    styleUrl: './action-toolbar.component.scss'
})
export class ActionToolbarComponent implements OnInit {
    selectedTrainee$: Observable<Trainee | null> = new Observable<Trainee | null>()
    isEditMode: boolean = false;

    constructor(private traineeDataService: TraineeDataService) {}

    ngOnInit() {
        this.selectedTrainee$ = this.traineeDataService.selectedTrainee$;
    }

}
