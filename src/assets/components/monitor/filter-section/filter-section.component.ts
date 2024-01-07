import { Component, OnDestroy, OnInit } from '@angular/core';
import { TraineeDataService } from '../../data/trainee-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GradesMonitorService } from '../grades-monitor.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-filter-section',
    standalone: true,
    imports: [MatInputModule, MatSelectModule, NgForOf, MatSlideToggleModule],
    templateUrl: './filter-section.component.html',
    styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent implements OnInit, OnDestroy {
    public traineeIds: number[] = [];
    public selectedTraineeIds: number[] = [];
    public nameFilter: string = '';
    public showPassed: boolean = true;
    public showFailed: boolean = true;
    private unsubscribe$ = new Subject<void>();

    constructor(private traineeDataService: TraineeDataService, private gradesMonitorService: GradesMonitorService) {}

    ngOnInit() {
        this.traineeDataService.trainees$.pipe(takeUntil(this.unsubscribe$)).subscribe(trainees => {
            this.traineeIds = trainees.map(trainee => trainee.id);
        });

        const filterState = this.gradesMonitorService.getCurrentFilterState();
        this.selectedTraineeIds = filterState.ids
        this.nameFilter = filterState.names.join(', ');
        this.showPassed = filterState.states.passed;
        this.showFailed = filterState.states.failed;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onIdSelectionChange(event: MatSelectChange): void {
        this.gradesMonitorService.setSelectedIds(event.value);
    }

    public onNameFilterChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.nameFilter = inputElement.value;
        this.gradesMonitorService.setSelectedNames(this.nameFilter ? [this.nameFilter] : []);
    }

    public onTogglePassedChange(event: MatSlideToggleChange): void {
        this.showPassed = event.checked;
        this.gradesMonitorService.setSelectedStates({passed: this.showPassed, failed: this.showFailed});
    }

    public onToggleFailedChange(event: MatSlideToggleChange): void {
        this.showFailed = event.checked;
        this.gradesMonitorService.setSelectedStates({passed: this.showPassed, failed: this.showFailed});
    }
}
