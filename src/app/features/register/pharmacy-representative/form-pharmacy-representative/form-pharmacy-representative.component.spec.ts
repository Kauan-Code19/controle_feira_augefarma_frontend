import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPharmacyRepresentativeComponent } from './form-pharmacy-representative.component';

describe('FormPharmacyRepresentativeComponent', () => {
  let component: FormPharmacyRepresentativeComponent;
  let fixture: ComponentFixture<FormPharmacyRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPharmacyRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPharmacyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
