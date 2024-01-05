import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TraineeDataService } from '../../trainee-data.service';

@Component({
    selector: 'app-table-toolbar',
    standalone: true,
    imports: [MatInputModule, MatButtonModule],
    templateUrl: './table-toolbar.component.html',
    styleUrl: './table-toolbar.component.scss'
})
export class TableToolbarComponent {
    constructor(private traineeDataService: TraineeDataService) {}

    applyFilter(filter: string): void {
        this.traineeDataService.filterTrainees(filter);
    }
}
