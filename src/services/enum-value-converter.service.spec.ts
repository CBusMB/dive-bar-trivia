import { TestBed } from '@angular/core/testing';

import { EnumValueConverterService } from './enum-value-converter.service';

describe('EnumValueConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumValueConverterService = TestBed.get(EnumValueConverterService);
    expect(service).toBeTruthy();
  });
});
