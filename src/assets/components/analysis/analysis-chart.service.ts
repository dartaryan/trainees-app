import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnalysisChartService {
    private selectedIdsSubject = new BehaviorSubject<number[]>([]);
    public selectedIds$ = this.selectedIdsSubject.asObservable();
    private selectedSubjectsSubject = new BehaviorSubject<string[]>([]);
    public selectedSubjects$ = this.selectedSubjectsSubject.asObservable();

    constructor() {}

    public setSelectedIds(ids: number[]): void {
        this.selectedIdsSubject.next(ids);
    }

    public setSelectedSubjects(subjects: string[]): void {
        this.selectedSubjectsSubject.next(subjects);
    }

    public getSelectedIds(): number[] {
        return this.selectedIdsSubject.getValue();
    }

    public getSelectedSubjects(): string[] {
        return this.selectedSubjectsSubject.getValue();
    }
}
