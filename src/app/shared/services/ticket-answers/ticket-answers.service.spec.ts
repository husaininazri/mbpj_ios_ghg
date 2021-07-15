import { TestBed } from '@angular/core/testing';

import { TicketAnswersService } from './ticket-answers.service';

describe('TicketAnswersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketAnswersService = TestBed.get(TicketAnswersService);
    expect(service).toBeTruthy();
  });
});
