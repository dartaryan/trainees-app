import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { TraineeDataService } from '../../trainee-data.service';

@Component({
    selector: 'app-details-toolbar',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgIf, AsyncPipe],
    templateUrl: './details-toolbar.component.html',
    styleUrl: './details-toolbar.component.scss'
})
export class DetailsToolbarComponent {
    isEditMode$ = this.traineeDataService.isEditMode$;
    @Output() edit = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    constructor(private traineeDataService: TraineeDataService) {}

    onEditClick(): void {
        this.traineeDataService.setEditMode(true)
        this.edit.emit();
    }

    onSaveClick(): void {
        this.traineeDataService.setEditMode(false)
        this.save.emit();
    }

    onCancelClick(): void {
        this.traineeDataService.setEditMode(false)
        this.cancel.emit();
    }
}
