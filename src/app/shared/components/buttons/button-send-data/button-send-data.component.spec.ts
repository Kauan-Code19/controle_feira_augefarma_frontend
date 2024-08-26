import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ButtonSendDataComponent } from './button-send-data.component'

describe('ButtonSendDataComponent', () => {
  let component: ButtonSendDataComponent
  let fixture: ComponentFixture<ButtonSendDataComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSendDataComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(ButtonSendDataComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
