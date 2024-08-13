import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLaboratoryComponent } from './form-laboratory.component';

describe('FormLaboratoryComponent', () => {
  let component: FormLaboratoryComponent;
  let fixture: ComponentFixture<FormLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLaboratoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
