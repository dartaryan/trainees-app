import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { TraineeDataService } from '../trainee-data.service';
import { Trainee } from '../trainees/trainee.interface';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from '@angular/forms';
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
    originalTraineeId: number | null = null;
    isEditMode: boolean = false;
    idExists = false
    public selectedTrainee: Trainee | null = null;
    traineeFields = [{name: 'id', label: 'ID'}, {name: 'name', label: 'Name'}, {
        name: 'date', label: 'Date'
    }, {name: 'grade', label: 'Grade'}, {name: 'subject', label: 'Subject'}, {
        name: 'email', label: 'Email'
    }, {name: 'address', label: 'Address'}, {name: 'city', label: 'City'}, {
        name: 'country', label: 'Country'
    }, {name: 'zip', label: 'Zip'}];

    constructor(private fb: FormBuilder, private traineeDataService: TraineeDataService) {
        this.traineeForm = this.fb.group({
            id: ['', [Validators.required, this.validateIdNotZero, this.numericValidator]],
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
            this.selectedTrainee = trainee
        });
    }

    onEditClick(): void {
        this.originalTraineeId = this.traineeForm.value.id;
        this.traineeDataService.setEditMode(true)
    }

    onSaveClick(): void {
        const updatedTrainee = this.traineeForm.value as Trainee;
        if (this.traineeDataService.getTraineeById(updatedTrainee.id, this.originalTraineeId)) {
            this.idExists = true
            alert('This ID already exists. Please use a different ID.');
        } else {
            this.idExists = false
            this.traineeDataService.updateTrainee(updatedTrainee, this.originalTraineeId);
            this.traineeDataService.setEditMode(false)
            this.originalTraineeId = null;
            this.traineeForm.reset();
            this.traineeDataService.selectTrainee(updatedTrainee);
        }
    }

    onCancelClick(): void {
        const currentTrainee = this.traineeForm.value as Trainee;
        if (currentTrainee.id === 0) {
            this.traineeDataService.removeTrainee(currentTrainee.id);
        }
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            trainee && this.traineeForm.patchValue(trainee);
        });
        this.traineeDataService.setEditMode(false)
    }

    validateIdNotZero(control: AbstractControl): ValidationErrors | null {
        return control.value !== 0 ? null : {invalidId: true};
    }

    numericValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value === null || value === '') return null;
        return !isNaN(parseFloat(value)) && isFinite(value) ? null : {nonNumeric: true};
    }
}

