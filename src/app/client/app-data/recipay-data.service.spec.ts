import { TestBed } from '@angular/core/testing';

import { RecipayDataService } from './recipay-data.service';

describe('RecipayDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipayDataService = TestBed.get(RecipayDataService);
    expect(service).toBeTruthy();
  });
});
