import { Component, Input } from '@angular/core';
import { PharmacyRepresentativeResponse } from '../../../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { CommonModule } from '@angular/common';
import { PharmacyRepresentativeService } from '../../../../shared/services/pharmacyRepresentative/pharmacy-representative.service';

@Component({
  selector: 'accordion-pharmacy-representative-component',
  standalone: true,
  imports: [CommonModule],
  providers: [PharmacyRepresentativeService],
  templateUrl: './accordion-pharmacy-representative.component.html',
  styleUrl: './accordion-pharmacy-representative.component.scss'
})
export class AccordionPharmacyRepresentativeComponent {
  @Input() results: PharmacyRepresentativeResponse[] = [];

  constructor(private pharmacyRepresentativeService: PharmacyRepresentativeService) {}

  download(id: number): void {
    this.pharmacyRepresentativeService.generatePharmacyRepresentativeBadge(id).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pharmacy_representative_${id}_badge.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
    )
  }
}
