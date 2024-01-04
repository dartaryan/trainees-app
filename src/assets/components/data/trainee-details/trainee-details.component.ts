import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Trainee } from '../trainees/trainee.interface';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-trainee-details',
    standalone: true,
    imports: [MatCardModule, NgForOf],
    templateUrl: './trainee-details.component.html',
    styleUrl: './trainee-details.component.scss'
})
export class TraineeDetailsComponent implements OnInit {
    public traineeDetailsArray: { key: string, value: number | string }[] = [];
    @Input() trainee: Trainee | null = {
        id: 537299,
        name: 'Alex Garcia',
        date: '07-04-2024',
        grade: 85,
        subject: 'Literature',
        email: 'trainee8@example.com',
        address: '2 Pine Lane',
        city: 'Sydney',
        country: 'Australia',
        zip: 59368
    }

    ngOnInit(): void {
        this.traineeDetailsArray = this.getTraineeDetailsArray(this.trainee);
    }


    private getTraineeDetailsArray(trainee: Trainee | null): { key: string, value: string | number }[] {
        if (trainee) {
            return Object.keys(trainee).map(key => {
                return {key: key, value: trainee[key as keyof Trainee]};
            });
        } else return []
    }
}

