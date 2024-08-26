import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormCheckingComponent } from './form-checking.component'

describe('FormCheckingComponent', () => {
  let component: FormCheckingComponent
  let fixture: ComponentFixture<FormCheckingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCheckingComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(FormCheckingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
