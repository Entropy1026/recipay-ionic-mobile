import { TestBed } from '@angular/core/testing';

import { CarrierApiService } from './carrier-api.service';

describe('CarrierApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarrierApiService = TestBed.get(CarrierApiService);
    expect(service).toBeTruthy();
  });
});
