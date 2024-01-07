import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { TraineeDataService } from '../trainee-data.service';

@Component({
    selector: 'app-details-toolbar',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgIf, AsyncPipe],
    templateUrl: './details-toolbar.component.html',
    styleUrl: './details-toolbar.component.scss'
})
export class DetailsToolbarComponent {
    isEditMode$ = this.traineeDataService.isEditMode$;
    @Input() isDisabled: boolean = false;
    @Output() edit = new EventEmitter<void>();
    @Output() save = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    constructor(private traineeDataService: TraineeDataService) {}

    public onEditClick(): void {
        this.traineeDataService.setEditMode(true)
        this.edit.emit();
    }

    public onSaveClick(): void {
        this.save.emit();
    }

    public onCancelClick(): void {
        this.traineeDataService.setEditMode(false)
        this.cancel.emit();
    }
}
