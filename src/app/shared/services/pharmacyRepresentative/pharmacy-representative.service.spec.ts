import { TestBed } from '@angular/core/testing';

import { PharmacyRepresentativeService } from './pharmacy-representative.service';

describe('PharmacyRepresentativeService', () => {
  let service: PharmacyRepresentativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyRepresentativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
