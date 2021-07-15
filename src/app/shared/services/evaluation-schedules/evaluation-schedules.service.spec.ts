import { TestBed } from '@angular/core/testing';

import { EvaluationSchedulesService } from './evaluation-schedules.service';

describe('EvaluationSchedulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluationSchedulesService = TestBed.get(EvaluationSchedulesService);
    expect(service).toBeTruthy();
  });
});
