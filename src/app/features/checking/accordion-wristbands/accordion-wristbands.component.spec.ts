import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionWristbandsComponent } from './accordion-wristbands.component';

describe('AccordionWristbandsComponent', () => {
  let component: AccordionWristbandsComponent;
  let fixture: ComponentFixture<AccordionWristbandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionWristbandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionWristbandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
