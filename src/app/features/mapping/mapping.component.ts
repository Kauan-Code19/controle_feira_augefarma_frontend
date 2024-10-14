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

  copyAllRepresentativesData(): void {
    let textToCopy = '';
    
    // Compor uma string com os dados de todos os representantes de farmácia
    this.pharmacyRepresentatives.forEach(representative => {
      textToCopy += `Name: ${representative.name}\nCNPJ: ${representative.cnpj}\nCorporate Reason: ${representative.corporateReason}\n\n`;
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          console.log('Data copied to clipboard');
          alert('All data copied to clipboard!'); // Feedback para o usuário
        },
        (err) => {
          console.error('Failed to copy data: ', err);
        }
      );
    } else {
      // Fallback para navegadores mais antigos
      let textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('All data copied to clipboard!'); // Feedback para o usuário
    }
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
