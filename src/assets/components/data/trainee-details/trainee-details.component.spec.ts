import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeDetailsComponent } from './trainee-details.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TraineeDataService } from '../trainee-data.service';
import { of } from 'rxjs';

describe('TraineeDetailsComponent', () => {
    let component: TraineeDetailsComponent;
    let fixture: ComponentFixture<TraineeDetailsComponent>;
    let traineeDataServiceMock: any;

    beforeEach(async () => {
        traineeDataServiceMock = {
            isEditMode$: of(false),
            selectedTrainee$: of(null),
            setEditMode: jasmine.createSpy(),
            updateTrainee: jasmine.createSpy(),
            selectTrainee: jasmine.createSpy(),
            removeTrainee: jasmine.createSpy()
        };

        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                TraineeDetailsComponent
            ],
            providers: [
                FormBuilder,
                { provide: TraineeDataService, useValue: traineeDataServiceMock }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(TraineeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set edit mode on edit button click', () => {
        component.onEditClick();
        expect(traineeDataServiceMock.setEditMode).toHaveBeenCalledWith(true);
    });

    it('should validate ID not to be zero', () => {
        let control = component.traineeForm.get('id');
        if (control && control.errors) {
            control.setValue(0);
            expect(control.errors).toBeTruthy();
            expect(control.errors['invalidId']).toBeTruthy();

            control.setValue(10);
            expect(control.errors).toBeNull();
        } else {
            fail('control is not available');

        }
    });

    it('should validate numeric fields', () => {
        let gradeControl = component.traineeForm.get('grade');
        if (gradeControl && gradeControl.errors) {
            gradeControl.setValue('abc');
            expect(gradeControl.errors).toBeTruthy();
            expect(gradeControl.errors['nonNumeric']).toBeTruthy();

            gradeControl.setValue(75);
            expect(gradeControl.errors).toBeNull();
        } else {
            fail('Grade control is not available');
        }
    });
});
