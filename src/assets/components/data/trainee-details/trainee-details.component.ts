import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { TraineeDataService } from '../trainee-data.service';
import { Observable } from 'rxjs';
import { Trainee } from '../trainees/trainee.interface';

@Component({
    selector: 'app-trainee-details',
    standalone: true,
    imports: [MatCardModule, NgForOf, AsyncPipe, NgIf, NgOptimizedImage],
    templateUrl: './trainee-details.component.html',
    styleUrl: './trainee-details.component.scss'
})
export class TraineeDetailsComponent implements OnInit {
    public selectedTrainee$: Observable<Trainee | null> = new Observable<Trainee | null>()

    constructor(protected traineeDataService: TraineeDataService) { }

    ngOnInit(): void {
        this.selectedTrainee$ = this.traineeDataService.selectedTrainee$
    }
}

