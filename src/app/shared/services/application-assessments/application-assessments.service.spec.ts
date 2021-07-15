import { TestBed } from '@angular/core/testing';

import { ApplicationAssessmentsService } from './application-assessments.service';

describe('ApplicationAssessmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationAssessmentsService = TestBed.get(ApplicationAssessmentsService);
    expect(service).toBeTruthy();
  });
});
