import { Component } from '@angular/core';
import { ChartAreaComponent } from './chart-area/chart-area.component';
import { MultiselectAreaComponent } from './multiselect-area/multiselect-area.component';

@Component({
    selector: 'app-analysis',
    standalone: true,
    imports: [ChartAreaComponent, MultiselectAreaComponent],
    templateUrl: './analysis.component.html',
    styleUrl: './analysis.component.scss'
})
export class AnalysisComponent {
}
