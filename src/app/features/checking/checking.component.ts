import { CommonModule } from '@angular/common'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { WebcamModule } from 'ngx-webcam'
import { FormCheckingComponent } from "./form-checking/form-checking.component"
import { ActivatedRoute, RouterModule } from '@angular/router'
import { ValidateEntryExitService } from '../../shared/services/authentication/validate-entry-exit.service'
import { EventSegment } from '../../shared/enums/event-segment'
import { ScannerQrCodeComponent } from './scanner-qrcode/scanner-qrcode'
import { WristBandsService } from '../../shared/services/authorization/wrist-bands.service'
import { WristbandsResponse } from '../../interfaces/authentication/wristbands-response'
import { AccordionWristbandsComponent } from "./accordion-wristbands/accordion-wristbands.component";

@Component({
  selector: 'checking-component',
  standalone: true,
  imports: [WebcamModule, CommonModule, FormCheckingComponent, RouterModule, ScannerQrCodeComponent, AccordionWristbandsComponent],
  providers: [ValidateEntryExitService],
  templateUrl: './checking.component.html',
  styleUrl: './checking.component.scss'
})
export class CheckingComponent implements OnInit {
  selectedOption: string | null = null; // Holds the selected option for check-in/check-out
  eventSegment: EventSegment | null = null; // Holds the current event segment
  wristbandsReponse: WristbandsResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private validateEntryExitService: ValidateEntryExitService,
    private wristbandsService: WristBandsService) {}

  // Lifecycle hook that is called after the component is initialized
  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      const segment = params['segment'] // Get the 'segment' parameter from the route
      if (segment) {
        // Normalize the segment to match the enum values (capitalize the first letter)
        const normalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
        
        // Convert the normalized segment to the corresponding EventSegment enum value
        const enumValue = EventSegment[normalizedSegment as keyof typeof EventSegment]
      
        // Assign the enum value to the eventSegment property
        this.eventSegment = enumValue

        this.defineSelectOption(this.eventSegment)
      }
    });
  }


  isEventSegmentParty() {
    return this.eventSegment == EventSegment.Party
  }

  defineSelectOption(option: string): void {
    if (option == EventSegment.Fair) {
      this.selectedOption = 'checkin'
    }

    if (option == EventSegment.Buffet) {
      this.selectedOption = 'checkout'
    }
  }

  // Method to send CPF to the backend based on the selected option and event segment
  sendCpfToBackend(cpf: string): void {
    // If check-in is selected and an event segment is available
    if (this.selectedOption === 'checkin' && this.eventSegment != null) {
      // Validate entry by sending CPF and event segment to the service
      this.validateEntryExitService.validateEntry(cpf, this.eventSegment.toUpperCase()).subscribe({
        next(response) {
          alert(response.message) // Alert the response message
        },
      });
    }

    // If check-out is selected and an event segment is available
    if (this.selectedOption === 'checkout' && this.eventSegment != null) {
      // Validate exit by sending CPF to the service
      this.validateEntryExitService.validateExit(cpf, this.eventSegment.toUpperCase()).subscribe({
        next(response) {
          alert(response.message) // Alert the response message
        },
      });
    }

    // If the event segment is for the party
    if (this.eventSegment == EventSegment.Party) {
      // Check the delivery status of the wristband by sending CPF to the service
      this.wristbandsService.checkDeliveryOfWristband(cpf)
      .subscribe(result => {
        this.wristbandsReponse = result
      });
    }
  }
}
