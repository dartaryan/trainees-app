import { Injectable } from '@angular/core';
import { Trainee } from './trainees/trainee.interface';
import { traineesData } from './trainees/data.mock';
import { BehaviorSubject } from 'rxjs';
import { TraineeFilteringService } from './trainee-filtering.service';

@Injectable({
    providedIn: 'root'
})
export class TraineeDataService {
    private trainees: Trainee[] = traineesData
    private traineesSubject = new BehaviorSubject<Trainee[]>(this.trainees);
    public trainees$ = this.traineesSubject.asObservable();
    private selectedTraineeSubject = new BehaviorSubject<Trainee | null>(null);
    public selectedTrainee$ = this.selectedTraineeSubject.asObservable();
    private isEditModeSubject = new BehaviorSubject<boolean>(false);
    public isEditMode$ = this.isEditModeSubject.asObservable();

    constructor(private filteringService: TraineeFilteringService) { }

    public filterTrainees(filter?: string): void {
        if (!filter) {
            this.traineesSubject.next(this.trainees);
        } else {
            const filteredTrainees = this.filteringService.filterTrainees(this.trainees, filter);
            this.traineesSubject.next(filteredTrainees);
        }
    }

    public selectTrainee(trainee: Trainee | null): void {
        this.selectedTraineeSubject.next(trainee);
    }

    public updateTrainee(updatedTrainee: Trainee): void {
        if (updatedTrainee.serialNumber === 0) {
            updatedTrainee.serialNumber = this.generateSerialNumber();
            this.trainees = [updatedTrainee, ...this.trainees];
            this.removeTrainee(0)
        } else {
            const index = this.trainees.findIndex(t => t.serialNumber === updatedTrainee.serialNumber);
            if (index !== -1) {
                this.trainees[index] = updatedTrainee;
            }
        }
        this.traineesSubject.next([...this.trainees]);
    }

    public setEditMode(isEditMode: boolean): void {
        this.isEditModeSubject.next(isEditMode);
    }

    public addTrainee(newTrainee: Trainee): void {
        this.trainees = [newTrainee, ...this.trainees];
        this.traineesSubject.next(this.trainees);
        this.selectTrainee(newTrainee)
    }

    public removeTrainee(serialNumber: number): void {
        this.trainees = this.trainees.filter(t => t.serialNumber !== serialNumber);
        this.traineesSubject.next(this.trainees);
        this.selectTrainee(null)
    }

    private generateSerialNumber(): number {
        let serialNumber: number;
        do {
            serialNumber = Math.floor(Math.random() * 100000000);
        } while (this.trainees.some(t => t.serialNumber === serialNumber));
        return serialNumber;
    }
}
