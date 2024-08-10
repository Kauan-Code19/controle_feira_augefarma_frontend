import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSendDataLaboratoryMembersComponent } from './button-send-data-laboratory-members.component';

describe('ButtonSendDataLaboratoryMembersComponent', () => {
  let component: ButtonSendDataLaboratoryMembersComponent;
  let fixture: ComponentFixture<ButtonSendDataLaboratoryMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSendDataLaboratoryMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSendDataLaboratoryMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
