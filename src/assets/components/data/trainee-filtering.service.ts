import { Injectable } from '@angular/core';
import { Trainee } from './trainees/trainee.interface';

@Injectable({
    providedIn: 'root'
})
export class TraineeFilteringService {

    constructor() { }

    public filterTrainees(trainees: Trainee[], filter: string): Trainee[] {
        if (!filter) {
            return trainees;
        }

        const filterParts = filter.split(/:\s*|\s+/).map(v => v.trim());
        const filterKey = filterParts[0].toLowerCase();
        const filterValue = filterParts[1]?.toLowerCase();

        if (filterParts.length === 1 || !filterValue) {
            return trainees.filter(trainee => Object.values(trainee).some(val => val.toString().toLowerCase().includes(filterKey)));
        } else {
            return trainees.filter(trainee => {
                const fieldValue = trainee[filterKey as keyof Trainee]?.toString().toLowerCase();

                if (filterValue.startsWith('>') || filterValue.startsWith('<')) {
                    const numericValue = parseFloat(fieldValue);
                    const rangeValue = parseFloat(filterValue.slice(1));

                    if (!isNaN(numericValue) && !isNaN(rangeValue)) {
                        return filterValue.startsWith('>') ? numericValue > rangeValue : numericValue < rangeValue;
                    }
                    return false;
                }

                return fieldValue ? fieldValue.includes(filterValue) : false;
            });
        }
    }

}
