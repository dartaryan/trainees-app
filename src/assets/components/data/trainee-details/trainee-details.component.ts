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
    isEditMode: boolean = false;
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
            grade: ['', [Validators.required, this.numericValidator]],  // Added numeric validator
            subject: [''],
            email: [''],
            address: [''],
            city: [''],
            country: [''],
            zip: ['', [this.numericValidator]],  // Added numeric validator
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
        this.traineeDataService.setEditMode(true);
    }

    onSaveClick(): void {
        let updatedTrainee = this.traineeForm.value as Trainee;
        updatedTrainee.id = Number(updatedTrainee.id);
        updatedTrainee.grade = Number(updatedTrainee.grade);
        updatedTrainee.zip = Number(updatedTrainee.zip);
        if (this.selectedTrainee) {
            updatedTrainee.serialNumber = this.selectedTrainee.serialNumber === 0 ? 0 : this.selectedTrainee.serialNumber;
        }
        this.traineeDataService.updateTrainee(updatedTrainee);
        this.traineeDataService.setEditMode(false);
        this.traineeForm.reset();
        this.traineeDataService.selectTrainee(updatedTrainee);
    }

    onCancelClick(): void {
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            trainee && this.traineeForm.patchValue(trainee);
        });
        this.traineeDataService.setEditMode(false);
        this.traineeDataService.removeTrainee(0)
        this.traineeForm.reset();
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

