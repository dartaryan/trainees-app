import { Component } from '@angular/core';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { TableSectionComponent } from './table-section/table-section.component';

@Component({
    selector: 'app-monitor',
    standalone: true,
    imports: [FilterSectionComponent, TableSectionComponent],
    templateUrl: './monitor.component.html',
    styleUrl: './monitor.component.scss'
})
export class MonitorComponent {

}
