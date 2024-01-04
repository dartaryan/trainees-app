import { TestBed } from '@angular/core/testing';

import { TraineeDataService } from './trainee-data.service';

describe('TraineeDataService', () => {
  let service: TraineeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
