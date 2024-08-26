import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormLaboratoryMemberComponent } from './form-laboratory-member.component'

describe('FormLaboratoryMemberComponent', () => {
  let component: FormLaboratoryMemberComponent
  let fixture: ComponentFixture<FormLaboratoryMemberComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLaboratoryMemberComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(FormLaboratoryMemberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
