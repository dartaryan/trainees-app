import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TraineeDataService } from '../../trainee-data.service';
import { Trainee } from '../../trainees/trainee.interface';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-table-toolbar',
    standalone: true,
    imports: [MatInputModule, MatButtonModule, NgIf, AsyncPipe],
    templateUrl: './table-toolbar.component.html',
    styleUrl: './table-toolbar.component.scss'
})
export class TableToolbarComponent implements OnInit {
    @Output() addTrainee = new EventEmitter<void>();
    public selectedTrainee: Trainee | null = null;
    isEditMode$ = this.traineeDataService.isEditMode$;

    constructor(private traineeDataService: TraineeDataService) {}

    ngOnInit() {
        this.traineeDataService.selectedTrainee$.subscribe(trainee => {
            this.selectedTrainee = trainee
        });
    }

    applyFilter(filter: string): void {
        this.traineeDataService.filterTrainees(filter);
    }

    onAddClick(): void {
        this.addTrainee.emit();
    }

    onRemoveClick(): void {
        if (this.selectedTrainee) {
            this.traineeDataService.removeTrainee(this.selectedTrainee.serialNumber);
        }
    }
}
