import { TestBed } from '@angular/core/testing';

import { PharmacistsService } from './pharmacists.service';

describe('PharmacistsService', () => {
  let service: PharmacistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
