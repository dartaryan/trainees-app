import { Component, OnInit } from '@angular/core';
import { TraineeDataService } from '../../data/trainee-data.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GradesMonitorService } from '../grades-monitor.service';

@Component({
    selector: 'app-filter-section',
    standalone: true,
    imports: [MatInputModule, MatSelectModule, NgForOf, MatSlideToggleModule],
    templateUrl: './filter-section.component.html',
    styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent implements OnInit {
    traineeIds: number[] = [];
    selectedTraineeIds: number[] = [];
    nameFilter: string = '';
    showPassed: boolean = true;
    showFailed: boolean = true;

    constructor(private traineeDataService: TraineeDataService, private gradesMonitorService: GradesMonitorService) {
        this.traineeDataService.trainees$.subscribe(trainees => {
            this.traineeIds = trainees.map(trainee => trainee.id);
        });
    }

    ngOnInit() {
        const filterState = this.gradesMonitorService.getCurrentFilterState();
        this.selectedTraineeIds = filterState.ids
        this.nameFilter = filterState.names.join(', ');
        this.showPassed = filterState.states.passed;
        this.showFailed = filterState.states.failed;
    }

    onIdSelectionChange(event: MatSelectChange): void {
        this.gradesMonitorService.setSelectedIds(event.value);
    }

    onNameFilterChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.nameFilter = inputElement.value;
        this.gradesMonitorService.setSelectedNames(this.nameFilter ? [this.nameFilter] : []);
    }

    onTogglePassedChange(event: MatSlideToggleChange): void {
        this.showPassed = event.checked;
        this.gradesMonitorService.setSelectedStates({passed: this.showPassed, failed: this.showFailed});
    }

    onToggleFailedChange(event: MatSlideToggleChange): void {
        this.showFailed = event.checked;
        this.gradesMonitorService.setSelectedStates({passed: this.showPassed, failed: this.showFailed});
    }
}
