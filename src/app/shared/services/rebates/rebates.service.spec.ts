import { TestBed } from '@angular/core/testing';

import { RebatesService } from './rebates.service';

describe('RebatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RebatesService = TestBed.get(RebatesService);
    expect(service).toBeTruthy();
  });
});
