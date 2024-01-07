import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Trainee } from '../data/trainees/trainee.interface';
import { TraineeDataService } from '../data/trainee-data.service';
import { GradesMonitorService } from './grades-monitor.service';

describe('GradesMonitorService', () => {
  let service: GradesMonitorService;
  let mockTraineeDataService: jasmine.SpyObj<TraineeDataService>;
  let traineesSubject: BehaviorSubject<Trainee[]>;

  beforeEach(() => {
    traineesSubject = new BehaviorSubject<Trainee[]>([]);
    mockTraineeDataService = jasmine.createSpyObj('TraineeDataService', [], {
      trainees$: traineesSubject.asObservable()
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: TraineeDataService, useValue: mockTraineeDataService }
      ]
    });
    service = TestBed.inject(GradesMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default filter state', () => {
    const defaultFilterState = service.getCurrentFilterState();
    expect(defaultFilterState.ids).toEqual([]);
    expect(defaultFilterState.names).toEqual([]);
    expect(defaultFilterState.states).toEqual({ passed: false, failed: false });
  });

  it('should update selected IDs correctly', () => {
    service.setSelectedIds([1, 2]);
    service.selectedIds$.subscribe(ids => {
      expect(ids).toEqual([1, 2]);
    });
  });

  it('should update selected names correctly', () => {
    service.setSelectedNames(['Alice', 'Bob']);
    service.selectedNames$.subscribe(names => {
      expect(names).toEqual(['Alice', 'Bob']);
    });
  });

  it('should update selected states correctly', () => {
    service.setSelectedStates({ passed: true, failed: false });
    service.selectedStates$.subscribe(states => {
      expect(states).toEqual({ passed: true, failed: false });
    });
  });

  it('should filter trainee statuses based on current filters', (done) => {
    const mockTrainees: Trainee[] = [
      {
        id: 166144,
        name: 'Jamie Wilson',
        date: '09-01-2024',
        grade: 96,
        subject: 'Mathematics',
        email: 'trainee1@example.com',
        address: '31 Oak Avenue',
        city: 'Toronto',
        country: 'USA',
        zip: 36492,
        serialNumber: 64688986
      }, {
        id: 112013,
        name: 'Riley Johnson',
        date: '02-12-2024',
        grade: 100,
        subject: 'Science',
        email: 'trainee2@example.com',
        address: '59 Maple Street',
        city: 'Sydney',
        country: 'USA',
        zip: 37785,
        serialNumber: 31856618
      },
    ];
    traineesSubject.next(mockTrainees);

    service.setSelectedNames(['Jamie Wilson']);
    service.filteredTraineeStatuses$.subscribe(filteredStatuses => {
      expect(filteredStatuses.length).toBe(1);
      expect(filteredStatuses[0].name).toBe('Jamie Wilson');
      done();
    });
  });


});
