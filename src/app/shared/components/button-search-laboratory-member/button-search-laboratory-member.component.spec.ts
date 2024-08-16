import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSearchLaboratoryMemberComponent } from './button-search-laboratory-member.component';

describe('ButtonSearchLaboratoryMemberComponent', () => {
  let component: ButtonSearchLaboratoryMemberComponent;
  let fixture: ComponentFixture<ButtonSearchLaboratoryMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSearchLaboratoryMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSearchLaboratoryMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
