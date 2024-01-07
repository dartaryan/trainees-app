import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { DetailsToolbarComponent } from '../details-toolbar/details-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-trainee-details',
    standalone: true,
    imports: [MatCardModule, NgForOf, AsyncPipe, NgIf, NgOptimizedImage, FormsModule, ReactiveFormsModule, MatInputModule, TitleCasePipe, DetailsToolbarComponent, MatIconModule, MatButtonModule],
    templateUrl: './trainee-details.component.html',
    styleUrl: './trainee-details.component.scss'
})
export class TraineeDetailsComponent implements OnInit, OnDestroy {
    public traineeForm: FormGroup;
    public isEditMode: boolean = false;
    public selectedTrainee: Trainee | null = null;
    public traineeFields = [{name: 'id', label: 'ID'}, {name: 'name', label: 'Name'}, {
        name: 'date', label: 'Date'
    }, {name: 'grade', label: 'Grade'}, {name: 'subject', label: 'Subject'}, {
        name: 'email', label: 'Email'
    }, {name: 'address', label: 'Address'}, {name: 'city', label: 'City'}, {
        name: 'country', label: 'Country'
    }, {name: 'zip', label: 'Zip'}];
    private unsubscribe$ = new Subject<void>();

    constructor(private fb: FormBuilder, private traineeDataService: TraineeDataService) {
        this.traineeForm = this.fb.group({
            id: ['', [Validators.required, this.validateIdNotZero, this.numericValidator]],
            name: [''],
            date: [''],
            grade: ['', [Validators.required, this.numericValidator]],
            subject: [''],
            email: [''],
            address: [''],
            city: [''],
            country: [''],
            zip: ['', [this.numericValidator]],
        });
    }


    ngOnInit(): void {
        this.traineeDataService.isEditMode$.pipe(takeUntil(this.unsubscribe$)).subscribe(isEditMode => {
            this.isEditMode = isEditMode;
        });

        this.traineeDataService.selectedTrainee$.pipe(takeUntil(this.unsubscribe$)).subscribe(trainee => {
            if (trainee) {
                this.traineeForm.patchValue(trainee);
                this.selectedTrainee = trainee;
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onEditClick(): void {
        this.traineeDataService.setEditMode(true);
    }

    public onSaveClick(): void {
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

    public onCancelClick(): void {
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            trainee && this.traineeForm.patchValue(trainee);
        });
        this.traineeDataService.setEditMode(false);
        this.traineeDataService.removeTrainee(0)
        this.traineeForm.reset();
    }

    public validateIdNotZero(control: AbstractControl): ValidationErrors | null {
        return control.value !== 0 ? null : {invalidId: true};
    }

    public numericValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value === null || value === '') return null;
        return !isNaN(parseFloat(value)) && isFinite(value) ? null : {nonNumeric: true};
    }
}

