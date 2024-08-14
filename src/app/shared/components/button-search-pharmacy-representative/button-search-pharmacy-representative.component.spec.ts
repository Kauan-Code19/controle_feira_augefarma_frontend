import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSearchPharmacyRepresentativeComponent } from './button-search-pharmacy-representative.component';

describe('ButtonSearchPharmacyRepresentativeComponent', () => {
  let component: ButtonSearchPharmacyRepresentativeComponent;
  let fixture: ComponentFixture<ButtonSearchPharmacyRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSearchPharmacyRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSearchPharmacyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
