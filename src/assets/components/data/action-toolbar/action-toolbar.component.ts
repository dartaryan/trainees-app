import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TraineeDataService } from '../trainee-data.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-action-toolbar',
    standalone: true,
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
    templateUrl: './action-toolbar.component.html',
    styleUrl: './action-toolbar.component.scss'
})
export class ActionToolbarComponent {

    constructor(private traineeDataService: TraineeDataService) {}

    applyFilter(filter: string): void {
        this.traineeDataService.filterTrainees(filter);
    }
}
