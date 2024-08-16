import { Component } from '@angular/core';
import { SearchPharmacyRepresentativeComponent } from "./search-pharmacy-representative/search-pharmacy-representative.component";
import { AccordionPharmacyRepresentativeComponent } from "./accordion-pharmacy-representative/accordion-pharmacy-representative.component";
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';

@Component({
  selector: 'badge-pharmacy-representative-component',
  standalone: true,
  imports: [SearchPharmacyRepresentativeComponent, AccordionPharmacyRepresentativeComponent],
  templateUrl: './badge-pharmacy-representative.component.html',
  styleUrl: './badge-pharmacy-representative.component.scss'
})
export class BadgePharmacyRepresentativeComponent {
  searchResults: PharmacyRepresentativeResponse[] = [];

  handleSearchResults(results: PharmacyRepresentativeResponse[]) {
    this.searchResults = results;
  }
}
