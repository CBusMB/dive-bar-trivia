import { TestBed } from '@angular/core/testing';

import { GameBuilderService } from './game-builder.service';

describe('GameBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameBuilderService = TestBed.get(GameBuilderService);
    expect(service).toBeTruthy();
  });
});
