import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgePharmacyRepresentativeComponent } from './badge-pharmacy-representative.component';

describe('BadgePharmacyRepresentativeComponent', () => {
  let component: BadgePharmacyRepresentativeComponent;
  let fixture: ComponentFixture<BadgePharmacyRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgePharmacyRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgePharmacyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
