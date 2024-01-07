import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgForOf, NgIf } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TraineeDataService } from '../../data/trainee-data.service';
import { Trainee } from '../../data/trainees/trainee.interface';
import { AnalysisChartService } from '../analysis-chart.service';


@Component({
    selector: 'app-chart-area',
    standalone: true,
    imports: [CdkDropList, CdkDrag, NgForOf, CanvasJSAngularChartsModule, NgIf],
    templateUrl: './chart-area.component.html',
    styleUrl: './chart-area.component.scss'
})
export class ChartAreaComponent implements OnInit {
    selectedTraineeIds: number[] = [];
    selectedSubjects: string[] = [];
    trainees: Trainee[] = []
    chart1Options: any;
    chart2Options: any;
    chart3Options: any;
    hiddenChartOptions = {
        theme: 'dark2', title: {
            text: 'Placeholder Title',
            verticalAlign: 'center',
            horizontalAlign: 'center',
            fontSize: '40',
            padding: 0,
            margin: 0,
        },
    }
    hiddenChartStyles = {
        height: '11.5em'
    }
    charts = [{id: 1, styles: {height: '21em'}, options: {title: {text: '',}}}, {
        id: 2, styles: {height: '21em'}, options: {title: {text: '',}}
    }, {id: 3, styles: {height: '21em'}, options: {title: {text: '',}}}];

    constructor(private traineeDataService: TraineeDataService, private analysisChartService: AnalysisChartService) {
    }

    ngOnInit(): void {
        this.traineeDataService.trainees$.subscribe(trainees => {
            this.trainees = trainees
            this.updateCharts();
            this.updateChartVisibility();
        });
        this.analysisChartService.selectedIds$.subscribe(ids => {
            this.selectedTraineeIds = ids;
            this.updateCharts();
            this.updateChartVisibility();
        });
        this.analysisChartService.selectedSubjects$.subscribe(subjects => {
            this.selectedSubjects = subjects;
            this.updateCharts();
            this.updateChartVisibility();
        });
    }

    ngOnChanges(): void {
        // this.updateCharts();
        // this.updateChartVisibility();
    }

    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.charts, event.previousIndex, event.currentIndex);
    }

    private updateCharts(): void {

        const filteredIds = this.selectedTraineeIds.length > 0 ? this.selectedTraineeIds : this.trainees.map(trainee => trainee.id);
        const filteredSubjects = this.selectedSubjects.length > 0 ? this.selectedSubjects : [...new Set(this.trainees.map(trainee => trainee.subject))];
        this.chart1Options = this.getAverageGradesOverTimeOptions(filteredIds);
        this.chart2Options = this.getTraineeAveragesOptions(filteredIds);
        this.chart3Options = this.getGradesAveragesPerSubjectOptions(filteredSubjects);
    }


    private updateChartVisibility(): void {
        this.charts[0].options = this.chart1Options;
        this.charts[1].options = this.chart2Options;
        this.charts[2].options = this.chart3Options;

        this.hiddenChartOptions = {
            ...this.hiddenChartOptions, title: {
                ...this.hiddenChartOptions.title, text: this.charts[2].options.title.text
            }
        };
    }

    private getAverageGradesOverTimeOptions(selectedIds: number[]): any {
        const dataSeries = selectedIds.map(id => {
            const traineeRecords = this.trainees.filter(trainee => trainee.id === id);
            const dataPoints = traineeRecords.map(record => {
                return {x: new Date(record.date), y: record.grade};
            });
            return {
                type: 'line', showInLegend: true, name: `${ id }`, dataPoints: dataPoints
            };
        });
        return {
            animationEnabled: true, theme: 'dark2', title: {
                text: 'Grades Average Over Time'
            }, axisX: {
                title: 'Time', valueFormatString: 'DD MMM, YYYY'
            }, axisY: {
                title: 'Grade', includeZero: false
            }, data: dataSeries
        };
    }

    private getTraineeAveragesOptions(selectedIds: number[]): any {
        const dataPoints = selectedIds.map(id => {
            const traineeRecords = this.trainees.filter(trainee => trainee.id === id);
            const averageGrade = traineeRecords.reduce((sum, record) => sum + record.grade, 0) / traineeRecords.length;
            return {label: `${ id }`, y: averageGrade};
        });

        return {
            animationEnabled: true, theme: 'dark2', title: {
                text: 'Trainee Averages'
            }, axisY: {
                title: 'Average Grade', includeZero: true
            }, data: [{
                type: 'column', dataPoints: dataPoints
            }]
        };
    }

    private getGradesAveragesPerSubjectOptions(selectedSubjects: string[]): any {
        const subjectAverages = selectedSubjects.map(subject => {
            const subjectRecords = this.trainees.filter(trainee => trainee.subject === subject);
            const averageGrade = subjectRecords.reduce((sum, record) => sum + record.grade, 0) / subjectRecords.length;

            return {label: subject, y: averageGrade};
        });

        return {
            animationEnabled: true, theme: 'dark2', title: {
                text: 'Grades Averages per Subject'
            }, data: [{
                type: 'pie',
                startAngle: 45,
                showInLegend: 'true',
                legendText: '{label}',
                indexLabel: '{label} - #percent%',
                dataPoints: subjectAverages
            }]
        };
    }
}
