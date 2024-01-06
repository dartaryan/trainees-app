import { TestBed } from '@angular/core/testing';

import { AnalysisChartService } from './analysis-chart.service';

describe('AnalysisChartService', () => {
  let service: AnalysisChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
