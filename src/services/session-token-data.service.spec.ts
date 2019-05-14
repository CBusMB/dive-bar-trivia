import { TestBed } from '@angular/core/testing';

import { SessionTokenDataService } from './session-token-data.service';

describe('SessionTokenDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionTokenDataService = TestBed.get(SessionTokenDataService);
    expect(service).toBeTruthy();
  });
});
