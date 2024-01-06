import { TestBed } from '@angular/core/testing';

import { GradesMonitorService } from './grades-monitor.service';

describe('GradesMonitorService', () => {
  let service: GradesMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradesMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
