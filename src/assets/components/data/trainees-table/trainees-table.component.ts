import { Component, EventEmitter, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { traineesData } from '../trainees/data.mock';
import { Trainee } from '../trainees/trainee.interface';

@Component({
    selector: 'app-trainees-table',
    standalone: true,
    imports: [MatTableModule],
    templateUrl: './trainees-table.component.html',
    styleUrl: './trainees-table.component.scss'
})
export class TraineesTableComponent {
    displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
    traineesData: Trainee[] = traineesData

    @Output() rowClicked = new EventEmitter<Trainee>();

    onRowClick(trainee: Trainee): void {
        console.log("onRowClick",trainee)
        this.rowClicked.emit(trainee);
    }
}
