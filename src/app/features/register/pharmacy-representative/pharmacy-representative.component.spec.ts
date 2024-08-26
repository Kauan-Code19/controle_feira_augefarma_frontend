import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PharmacyRepresentativeComponent } from './pharmacy-representative.component'

describe('PharmacyRepresentativeComponent', () => {
  let component: PharmacyRepresentativeComponent
  let fixture: ComponentFixture<PharmacyRepresentativeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyRepresentativeComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(PharmacyRepresentativeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
