import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLaboratoryMemberComponent } from './search-laboratory-member.component';

describe('SearchLaboratoryMemberComponent', () => {
  let component: SearchLaboratoryMemberComponent;
  let fixture: ComponentFixture<SearchLaboratoryMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLaboratoryMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchLaboratoryMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
