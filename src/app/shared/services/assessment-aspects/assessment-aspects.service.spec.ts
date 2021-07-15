import { TestBed } from '@angular/core/testing';

import { AssessmentAspectsService } from './assessment-aspects.service';

describe('AssessmentAspectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentAspectsService = TestBed.get(AssessmentAspectsService);
    expect(service).toBeTruthy();
  });
});
