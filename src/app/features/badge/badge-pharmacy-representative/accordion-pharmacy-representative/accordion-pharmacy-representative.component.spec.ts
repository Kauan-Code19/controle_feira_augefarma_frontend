import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionPharmacyRepresentativeComponent } from './accordion-pharmacy-representative.component';

describe('AccordionPharmacyRepresentativeComponent', () => {
  let component: AccordionPharmacyRepresentativeComponent;
  let fixture: ComponentFixture<AccordionPharmacyRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionPharmacyRepresentativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionPharmacyRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
