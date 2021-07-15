import { TestBed } from '@angular/core/testing';

import { TicketQuestionsService } from './ticket-questions.service';

describe('TicketQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketQuestionsService = TestBed.get(TicketQuestionsService);
    expect(service).toBeTruthy();
  });
});
