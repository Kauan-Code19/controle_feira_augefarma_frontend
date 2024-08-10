import { TestBed } from '@angular/core/testing';

import { LaboratoryMemberService } from './laboratory-member.service';

describe('LaboratoryMemberService', () => {
  let service: LaboratoryMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
