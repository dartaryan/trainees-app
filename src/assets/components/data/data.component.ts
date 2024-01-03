import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { traineesData } from './trainees/data.mock';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { TraineesTableComponent } from './trainees-table/trainees-table.component';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [MatTableModule, ActionToolbarComponent, TraineesTableComponent],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent {
    data = traineesData;
    displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];

}
