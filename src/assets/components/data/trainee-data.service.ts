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

}
