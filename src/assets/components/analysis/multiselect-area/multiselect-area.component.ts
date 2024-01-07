import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TraineeDataService } from '../../data/trainee-data.service';
import { FormsModule } from '@angular/forms';
import { AnalysisChartService } from '../analysis-chart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-multiselect-area',
    standalone: true,
    imports: [MatInputModule, MatSelectModule, NgForOf, FormsModule, AsyncPipe],
    templateUrl: './multiselect-area.component.html',
    styleUrl: './multiselect-area.component.scss'
})
export class MultiselectAreaComponent implements OnInit, OnDestroy {
    public traineeIds: number[] = [];
    public subjects: string[] = [];
    public currentSelectedIds: number[] = [];
    public currentSelectedSubjects: string[] = [];
    private unsubscribe$ = new Subject<void>();

    constructor(private traineeDataService: TraineeDataService, private analysisChartService: AnalysisChartService) {}

    ngOnInit() {
        this.traineeDataService.trainees$.pipe(takeUntil(this.unsubscribe$)).subscribe(trainees => {
            this.traineeIds = trainees.map(trainee => trainee.id);
            this.subjects = [...new Set(trainees.map(trainee => trainee.subject))];
            this.currentSelectedIds = this.analysisChartService.getSelectedIds();
            this.currentSelectedSubjects = this.analysisChartService.getSelectedSubjects();
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    public onIdSelectionChange(event: MatSelectChange) {
        this.analysisChartService.setSelectedIds(event.value);
    }

    public onSubjectSelectionChange(event: MatSelectChange) {
        this.analysisChartService.setSelectedSubjects(event.value);
    }
}
