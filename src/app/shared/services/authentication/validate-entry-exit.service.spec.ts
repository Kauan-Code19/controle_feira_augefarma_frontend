import { TestBed } from '@angular/core/testing'
import { ValidateEntryExitService } from './validate-entry-exit.service'

describe('ValidateEntryExitService', () => {
  let service: ValidateEntryExitService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ValidateEntryExitService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
