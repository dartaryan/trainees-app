import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisChartService {
  private selectedIdsSubject = new BehaviorSubject<number[]>([]);
  private selectedSubjectsSubject = new BehaviorSubject<string[]>([]);

  selectedIds$ = this.selectedIdsSubject.asObservable();
  selectedSubjects$ = this.selectedSubjectsSubject.asObservable();

  constructor() {}

  setSelectedIds(ids: number[]): void {
    this.selectedIdsSubject.next(ids);
  }

  setSelectedSubjects(subjects: string[]): void {
    this.selectedSubjectsSubject.next(subjects);
  }

  getSelectedIds(): number[] {
    return this.selectedIdsSubject.getValue();
  }

  getSelectedSubjects(): string[] {
    return this.selectedSubjectsSubject.getValue();
  }
}
