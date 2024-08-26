import { Component, Input } from '@angular/core'
import { PharmacyRepresentativeResponse } from '../../../../interfaces/pharmacy_representative/pharmacy-representative-response'
import { CommonModule } from '@angular/common'
import { PharmacyRepresentativeService } from '../../../../shared/services/pharmacyRepresentative/pharmacy-representative.service'

@Component({
  selector: 'accordion-pharmacy-representative-component',
  standalone: true,
  imports: [CommonModule],
  providers: [PharmacyRepresentativeService],
  templateUrl: './accordion-pharmacy-representative.component.html',
  styleUrl: './accordion-pharmacy-representative.component.scss'
})
export class AccordionPharmacyRepresentativeComponent {
  // Input property to receive results of pharmacy representatives
  @Input() results: PharmacyRepresentativeResponse[] = [];

  // Constructor to inject the PharmacyRepresentativeService
  constructor(private pharmacyRepresentativeService: PharmacyRepresentativeService) {}

  // Method to download the badge of a pharmacy representative
  download(id: number): void {
    this.pharmacyRepresentativeService.generatePharmacyRepresentativeBadge(id).subscribe(
      (response: Blob) => {
        // Create a new Blob object to represent the PDF response
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        const a = document.createElement('a'); // Create an anchor element
        a.href = url; // Set the href attribute to the Blob URL
        a.download = `pharmacy_representative_${id}_badge.pdf`; // Set the filename for download
        a.click(); // Programmatically click the anchor to trigger the download
        window.URL.revokeObjectURL(url); // Release the Blob URL
      },
    );
  }
}
