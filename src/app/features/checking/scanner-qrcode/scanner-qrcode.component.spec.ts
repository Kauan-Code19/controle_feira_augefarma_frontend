import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ScannerQrCodeComponent } from './scanner-qrcode'

describe('ScannerQrCodeComponent', () => {
  let component: ScannerQrCodeComponent
  let fixture: ComponentFixture<ScannerQrCodeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScannerQrCodeComponent]
    })
    .compileComponents()
    
    fixture = TestBed.createComponent(ScannerQrCodeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
