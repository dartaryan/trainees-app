import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActionToolbarComponent } from './action-toolbar/action-toolbar.component';
import { TraineesTableComponent } from './trainees-table/trainees-table.component';
import { TraineeDetailsComponent } from './trainee-details/trainee-details.component';
import { TableToolbarComponent } from './action-toolbar/table-toolbar/table-toolbar.component';

@Component({
    selector: 'app-data',
    standalone: true,
    imports: [MatTableModule, ActionToolbarComponent, TraineesTableComponent, TraineeDetailsComponent, TableToolbarComponent],
    templateUrl: './data.component.html',
    styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }

}
