import { TestBed } from '@angular/core/testing';

import { TraineeFilteringService } from './trainee-filtering.service';

describe('TraineeFilteringService', () => {
  let service: TraineeFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
