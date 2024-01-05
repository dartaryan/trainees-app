import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-details-toolbar',
    standalone: true,
    imports: [MatIconModule, MatButtonModule, NgIf],
    templateUrl: './details-toolbar.component.html',
    styleUrl: './details-toolbar.component.scss'
})
export class DetailsToolbarComponent {
    isEditMode: boolean = false;

    onEditClick(): void {
        this.isEditMode = true;
    }

    onSaveClick(): void {
        // Save logic here
        this.isEditMode = false;
    }

    onCancelClick(): void {
        this.isEditMode = false;
    }
}
