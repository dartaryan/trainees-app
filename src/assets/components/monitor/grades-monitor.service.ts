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
    filteredTraineeStatuses$: Observable<TraineeStatus[]>;
    private currentFilterState: FilterState = {
        ids: [], names: [], states: {passed: false, failed: false}
    };
    private selectedIdsSubject = new BehaviorSubject<number[]>([]);
    selectedIds$ = this.selectedIdsSubject.asObservable();
    private selectedNamesSubject = new BehaviorSubject<string[]>([]);
    selectedNames$ = this.selectedNamesSubject.asObservable();
    private selectedStatesSubject = new BehaviorSubject<{ passed: boolean; failed: boolean }>({
        passed: false, failed: false
    });
    selectedStates$ = this.selectedStatesSubject.asObservable();
    private traineeStatusesSubject = new BehaviorSubject<TraineeStatus[]>([]);
    traineeStatuses$ = this.traineeStatusesSubject.asObservable();

    constructor(private traineeDataService: TraineeDataService) {
        this.traineeDataService.trainees$.subscribe(trainees => {
            this.updateTraineeStatuses(trainees);
        });
        this.filteredTraineeStatuses$ = combineLatest([this.traineeStatuses$, this.selectedIds$, this.selectedNames$, this.selectedStates$]).pipe(map(([statuses, selectedIds, selectedNames, selectedStates]) => {
            return statuses.filter(status => {
                const idMatch = selectedIds.length === 0 || selectedIds.includes(status.id);
                const nameMatch = selectedNames.length === 0 || selectedNames.some(name => status.name.toLowerCase().includes(name.toLowerCase()));
                const stateMatch = (!selectedStates.passed && !selectedStates.failed) || (selectedStates.passed && status.passed) || (selectedStates.failed && !status.passed);
                return idMatch && nameMatch && stateMatch;
            });
        }));
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

    getCurrentFilterState() {
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

        const allStatuses = Array.from(traineeStatusMap).map(([id, data]) => {
            const averageGrade = data.totalGrade / data.testCount;
            return {
                id: id,
                name: data.name,
                averageGrade: averageGrade,
                numberOfExams: data.testCount,
                passed: averageGrade >= 65
            };
        });

        this.traineeStatusesSubject.next(allStatuses);
    }
}
