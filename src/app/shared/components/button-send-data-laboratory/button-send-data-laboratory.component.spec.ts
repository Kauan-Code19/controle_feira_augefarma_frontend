import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSendDataLaboratoryComponent } from './button-send-data-laboratory.component';

describe('ButtonSendDataLaboratoryComponent', () => {
  let component: ButtonSendDataLaboratoryComponent;
  let fixture: ComponentFixture<ButtonSendDataLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSendDataLaboratoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSendDataLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
