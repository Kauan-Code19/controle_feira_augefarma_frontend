import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSendDataPharmacyRepresentativesComponent } from './button-send-data-pharmacy-representatives.component';

describe('ButtonSendDataPharmacyRepresentativesComponent', () => {
  let component: ButtonSendDataPharmacyRepresentativesComponent;
  let fixture: ComponentFixture<ButtonSendDataPharmacyRepresentativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSendDataPharmacyRepresentativesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSendDataPharmacyRepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
