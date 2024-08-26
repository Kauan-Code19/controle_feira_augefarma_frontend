import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeContainerComponent } from './badge-container.component';

describe('BadgeContainerComponent', () => {
  let component: BadgeContainerComponent;
  let fixture: ComponentFixture<BadgeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BadgeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
