import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BadgeLaboratoryMemberComponent } from './badge-laboratory-member.component'

describe('BadgeLaboratoryMemberComponent', () => {
  let component: BadgeLaboratoryMemberComponent
  let fixture: ComponentFixture<BadgeLaboratoryMemberComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeLaboratoryMemberComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(BadgeLaboratoryMemberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
