import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchPharmacyRepresentativeComponent } from './search-pharmacy-representative.component'

describe('SearchPharmacyRepresentativeComponent', () => {
  let component: SearchPharmacyRepresentativeComponent
  let fixture: ComponentFixture<SearchPharmacyRepresentativeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPharmacyRepresentativeComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(SearchPharmacyRepresentativeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
