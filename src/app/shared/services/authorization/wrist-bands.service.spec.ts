import { TestBed } from '@angular/core/testing';

import { WristBandsService } from './wrist-bands.service';

describe('WristBandsService', () => {
  let service: WristBandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WristBandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
