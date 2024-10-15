import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionEntityComponent } from './accordion-entity.component';

describe('AccordionEntityComponent', () => {
  let component: AccordionEntityComponent;
  let fixture: ComponentFixture<AccordionEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionEntityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
