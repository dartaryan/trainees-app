import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TraineeDataService } from '../../data/trainee-data.service';
import { FormsModule } from '@angular/forms';
import { AnalysisChartService } from '../analysis-chart.service';

@Component({
    selector: 'app-multiselect-area',
    standalone: true,
    imports: [MatInputModule, MatSelectModule, NgForOf, FormsModule, AsyncPipe],
    templateUrl: './multiselect-area.component.html',
    styleUrl: './multiselect-area.component.scss'
})
export class MultiselectAreaComponent implements OnInit {
  traineeIds: number[] = [];
  subjects: string[] = [];
  currentSelectedIds: number[] = [];
  currentSelectedSubjects: string[] = [];

  constructor(
    private traineeDataService: TraineeDataService,
    private analysisChartService: AnalysisChartService
  ) {}

  ngOnInit() {
    this.traineeDataService.trainees$.subscribe(trainees => {
      this.traineeIds = trainees.map(trainee => trainee.id);
      this.subjects = [...new Set(trainees.map(trainee => trainee.subject))];
      this.currentSelectedIds = this.analysisChartService.getSelectedIds();
      this.currentSelectedSubjects = this.analysisChartService.getSelectedSubjects();
    });
  }

  onIdSelectionChange(event: MatSelectChange) {
    this.analysisChartService.setSelectedIds(event.value);
  }

  onSubjectSelectionChange(event: MatSelectChange) {
    this.analysisChartService.setSelectedSubjects(event.value);
  }
}
