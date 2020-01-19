import { TestBed } from '@angular/core/testing';

import { RecipayApiService } from './recipay-api.service';

describe('RecipayApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipayApiService = TestBed.get(RecipayApiService);
    expect(service).toBeTruthy();
  });
});
