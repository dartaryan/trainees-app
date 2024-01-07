import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Trainee } from '../data/trainees/trainee.interface';
import { TraineeDataService } from '../data/trainee-data.service';
import { TraineeStatus } from './table-section/traineeStatus.interface';
import { FilterState } from './filter-section/filter/filter-state.interface';

@Injectable({
    providedIn: 'root'
})
export class GradesMonitorService {
    private currentFilterState: FilterState = {ids: [], names: [], states: {passed: false, failed: false} };
    private selectedIdsSubject = new BehaviorSubject<number[]>([]);
    private selectedNamesSubject = new BehaviorSubject<string[]>([]);
    private selectedStatesSubject = new BehaviorSubject<{ passed: boolean; failed: boolean }>({  passed: false, failed: false});
    private traineeStatusesSubject = new BehaviorSubject<TraineeStatus[]>([]);

    selectedIds$ = this.selectedIdsSubject.asObservable();
    selectedNames$ = this.selectedNamesSubject.asObservable();
    selectedStates$ = this.selectedStatesSubject.asObservable();
    traineeStatuses$ = this.traineeStatusesSubject.asObservable();
    filteredTraineeStatuses$: Observable<TraineeStatus[]>;

    constructor(private traineeDataService: TraineeDataService) {
        this.traineeDataService.trainees$.subscribe(trainees => {
            this.updateTraineeStatuses(trainees);
        });

        this.filteredTraineeStatuses$ = combineLatest([
            this.traineeStatuses$,
            this.selectedIds$,
            this.selectedNames$,
            this.selectedStates$
        ]).pipe(
            map(([statuses, selectedIds, selectedNames, selectedStates]) => {
                return statuses.filter(status => this.isStatusMatchingFilters(status, selectedIds, selectedNames, selectedStates));
            })
        );
    }

    private isStatusMatchingFilters(status: TraineeStatus, ids: number[], names: string[], states: { passed: boolean; failed: boolean }): boolean {
        const idMatch = ids.length === 0 || ids.includes(status.id);
        const nameMatch = names.length === 0 || names.some(name => status.name.toLowerCase().includes(name.toLowerCase()));
        const stateMatch = (!states.passed && !states.failed) ||
                           (states.passed && status.passed) ||
                           (states.failed && !status.passed);

        return idMatch && nameMatch && stateMatch;
    }

    setSelectedIds(ids: number[]): void {
        this.currentFilterState.ids = ids;
        this.selectedIdsSubject.next(ids);
    }

    setSelectedNames(names: string[]): void {
        this.currentFilterState.names = names;
        this.selectedNamesSubject.next(names);
    }

    setSelectedStates(states: { passed: boolean; failed: boolean }): void {
        this.currentFilterState.states = states;
        this.selectedStatesSubject.next(states);
    }

    getCurrentFilterState(): FilterState {
        return this.currentFilterState;
    }


    private updateTraineeStatuses(trainees: Trainee[]): void {
        const traineeStatusMap = new Map<number, { name: string, totalGrade: number, testCount: number }>();

        trainees.forEach(trainee => {
            if (traineeStatusMap.has(trainee.id)) {
                const currentStatus = traineeStatusMap.get(trainee.id)!;
                traineeStatusMap.set(trainee.id, {
                    name: currentStatus.name,
                    totalGrade: currentStatus.totalGrade + trainee.grade,
                    testCount: currentStatus.testCount + 1
                });
            } else {
                traineeStatusMap.set(trainee.id, {
                    name: trainee.name, totalGrade: trainee.grade, testCount: 1
                });
            }
        });

        this.traineeStatusesSubject.next(this.calculateTraineeStatuses(traineeStatusMap));
    }

    private calculateTraineeStatuses(statusMap: Map<number, { name: string, totalGrade: number, testCount: number }>): TraineeStatus[] {
        return Array.from(statusMap.entries()).map(([id, { name, totalGrade, testCount }]) => {
            const averageGrade = totalGrade / testCount;
            return {
                id,
                name,
                averageGrade,
                numberOfExams: testCount,
                passed: averageGrade >= 65
            };
        });
    }
}
