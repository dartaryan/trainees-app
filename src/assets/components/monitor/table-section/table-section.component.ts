import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { GradesMonitorService } from '../grades-monitor.service';
import { TraineeStatus } from './traineeStatus.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-table-section',
    standalone: true,
    imports: [MatTableModule, MatPaginatorModule, NgIf],
    templateUrl: './table-section.component.html',
    styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent implements OnInit {
    dataSource = new MatTableDataSource<TraineeStatus>;
    displayedColumns = ['id', 'name', 'average', 'exams'];

    constructor(private gradesMonitorService: GradesMonitorService) {}

    private _paginator!: MatPaginator;

    @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
        if (value) {
            this._paginator = value;
            this.dataSource.paginator = this._paginator;
        }
    }

    ngOnInit(): void {
        this.gradesMonitorService.filteredTraineeStatuses$.subscribe(traineeStatuses => {
            this.dataSource.data = traineeStatuses;
            this.paginator && this.paginator.firstPage();
        });
    }
}
