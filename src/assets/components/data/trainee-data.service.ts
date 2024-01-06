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

    filterTrainees(filter?: string): void {
        if (!filter) {
            this.traineesSubject.next(this.trainees);
        } else {
            const filteredTrainees = this.filteringService.filterTrainees(this.trainees, filter);
            this.traineesSubject.next(filteredTrainees);
        }
    }

    selectTrainee(trainee: Trainee | null): void {
        this.selectedTraineeSubject.next(trainee);
    }

    updateTrainee(updatedTrainee: Trainee, oldTraineeId: number | null): void {
        if (oldTraineeId && oldTraineeId !== updatedTrainee.id) {
            this.trainees = [updatedTrainee, ...this.trainees];
            this.removeTrainee(oldTraineeId);
        } else {
            const index = this.trainees.findIndex(t => t.id === updatedTrainee.id);
            if (index !== -1) {
                this.trainees[index] = updatedTrainee;
            } else {
                this.trainees = [updatedTrainee, ...this.trainees];
            }
            this.removeTrainee(0);
        }

        this.traineesSubject.next([...this.trainees]);
    }

    setEditMode(isEditMode: boolean): void {
        this.isEditModeSubject.next(isEditMode);
    }

    addTrainee(newTrainee: Trainee): void {
        this.trainees = [newTrainee, ...this.trainees];
        this.traineesSubject.next(this.trainees);
    }

    removeTrainee(traineeId: number): void {
        this.trainees = this.trainees.filter(t => t.id !== traineeId);
        this.traineesSubject.next(this.trainees);
        if (this.selectedTraineeSubject.value?.id === traineeId) {
            this.selectedTraineeSubject.next(null);
        }
    }

    getTraineeById(id: number, originalId: number | null): Trainee | undefined {
        const typedId = Number(id)
        return this.trainees.find(trainee => {return (trainee.id === typedId) && typedId !== originalId});
    }

    getUniqueIds(): number[] {
        return Array.from(new Set(this.trainees.map(trainee => trainee.id)));
    }

    getUniqueSubjects(): string[] {
        return Array.from(new Set(this.trainees.map(trainee => trainee.subject)));
    }

}
