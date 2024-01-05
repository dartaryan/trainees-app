import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { TraineeDataService } from '../trainee-data.service';
import { Observable } from 'rxjs';
import { Trainee } from '../trainees/trainee.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DetailsToolbarComponent } from '../action-toolbar/details-toolbar/details-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-trainee-details',
    standalone: true,
    imports: [MatCardModule, NgForOf, AsyncPipe, NgIf, NgOptimizedImage, FormsModule, ReactiveFormsModule, MatInputModule, TitleCasePipe, DetailsToolbarComponent, MatIconModule, MatButtonModule],
    templateUrl: './trainee-details.component.html',
    styleUrl: './trainee-details.component.scss'
})
export class TraineeDetailsComponent implements OnInit {
    traineeForm: FormGroup;

    public selectedTrainee$: Observable<Trainee | null> = new Observable<Trainee | null>()
    isEditMode: boolean = false;

    traineeFields = [{name: 'id', label: 'ID'}, {name: 'name', label: 'Name'}, {
        name: 'date', label: 'Date'
    }, {name: 'grade', label: 'Grade'}, {name: 'subject', label: 'Subject'}, {
        name: 'email', label: 'Email'
    }, {name: 'address', label: 'Address'}, {name: 'city', label: 'City'}, {
        name: 'country', label: 'Country'
    }, {name: 'zip', label: 'Zip'}];

    constructor(private fb: FormBuilder, private traineeDataService: TraineeDataService) {
        this.traineeForm = this.fb.group({
            id: [''],
            name: [''],
            date: [''],
            grade: [''],
            subject: [''],
            email: [''],
            address: [''],
            city: [''],
            country: [''],
            zip: ['']
        });
    }


    ngOnInit(): void {
        this.traineeDataService.isEditMode$.subscribe(isEditMode => {
            this.isEditMode = isEditMode
        });
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            trainee && this.traineeForm.patchValue(trainee);
        });
        this.selectedTrainee$ = this.traineeDataService.selectedTrainee$
    }

    onEditClick(): void {
        this.traineeDataService.setEditMode(true)
    }

    onSaveClick(): void {
        const updatedTrainee = this.traineeForm.value as Trainee;
        this.traineeDataService.updateTrainee(updatedTrainee);
        this.traineeDataService.setEditMode(false)
    }

    onCancelClick(): void {
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            trainee && this.traineeForm.patchValue(trainee);
        });
        this.traineeDataService.setEditMode(false)
    }
}

