import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionLaboratoryMemberComponent } from './accordion-laboratory-member.component';

describe('AccordionLaboratoryMemberComponent', () => {
  let component: AccordionLaboratoryMemberComponent;
  let fixture: ComponentFixture<AccordionLaboratoryMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionLaboratoryMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionLaboratoryMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
