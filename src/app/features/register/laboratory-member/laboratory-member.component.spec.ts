import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryMemberComponent } from './laboratory-member.component';

describe('LaboratoryMemberComponent', () => {
  let component: LaboratoryMemberComponent;
  let fixture: ComponentFixture<LaboratoryMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaboratoryMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaboratoryMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
