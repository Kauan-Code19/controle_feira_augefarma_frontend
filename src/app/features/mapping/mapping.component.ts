import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core'
import { PharmacyRepresentativeResponse } from '../../interfaces/pharmacy_representative/pharmacy-representative-response'
import { StompService } from '../../shared/services/socket/stomp.service'
import { Subscription } from 'rxjs'
import { LaboratoryMemberResponse } from '../../interfaces/laboratory/laboratory-member-response'

@Component({
  selector: 'mapping-component',
  standalone: true,
  imports: [CommonModule],
  providers: [StompService],
  templateUrl: './mapping.component.html',
  styleUrl: './mapping.component.scss'
})
export class MappingComponent implements OnInit, OnDestroy {
  pharmacyRepresentatives: PharmacyRepresentativeResponse[] = []; // Array to hold pharmacy representatives
  laboratoryMembers: LaboratoryMemberResponse[] = []; // Array to hold laboratory members
  currentDateTime: string = new Date().toLocaleString(); // Current date and time in local string format
  private intervalId: any; // Variable to hold the interval ID for updating the date and time

  private subscriptions: Subscription[] = []; // Array to hold subscriptions for cleanup

  constructor(private stompService: StompService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  // Lifecycle hook that is called when the component is initialized
  ngOnInit(): void {
    // Subscribe to the pharmacy representative updates from the Stomp service
    this.subscriptions.push(
      this.stompService.pharmacyRepresentative$.subscribe((pharmacyRepresentatives) => {
        this.pharmacyRepresentatives = pharmacyRepresentatives; // Update the pharmacyRepresentatives array with new data
      })
    );

    // Subscribe to the laboratory member updates from the Stomp service
    this.subscriptions.push(
      this.stompService.laboratoryMember$.subscribe((laboratoryMembers) => {
        this.laboratoryMembers = laboratoryMembers; // Update the laboratoryMembers array with new data
      })
    );

    // Run the interval to update the current date and time outside of Angular's zone
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.updateDateTime(); // Call the method to update the current date and time every second
      }, 1000);
    });
  }

  // Method to update the current date and time
  private updateDateTime(): void {
    this.currentDateTime = new Date().toLocaleString(); // Get the current date and time
    this.cdr.detectChanges(); // Manually trigger change detection to update the view
  }

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // Unsubscribe from all subscriptions to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval to stop updating the date and time
    }
  }
}
