import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSendDataAdministratorsComponent } from './button-send-data-administrators.component';

describe('ButtonSendDataAdministratorsComponent', () => {
  let component: ButtonSendDataAdministratorsComponent;
  let fixture: ComponentFixture<ButtonSendDataAdministratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSendDataAdministratorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSendDataAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
