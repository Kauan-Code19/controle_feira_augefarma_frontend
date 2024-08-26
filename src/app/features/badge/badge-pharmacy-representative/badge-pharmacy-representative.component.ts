import { Component } from '@angular/core'
import { SearchPharmacyRepresentativeComponent } from "./search-pharmacy-representative/search-pharmacy-representative.component"
import { AccordionPharmacyRepresentativeComponent } from "./accordion-pharmacy-representative/accordion-pharmacy-representative.component"
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response'
import { BadgeContainerComponent } from "../../../shared/components/html/badge-container/badge-container.component";

@Component({
  selector: 'badge-pharmacy-representative-component',
  standalone: true,
  imports: [SearchPharmacyRepresentativeComponent, AccordionPharmacyRepresentativeComponent, BadgeContainerComponent],
  templateUrl: './badge-pharmacy-representative.component.html',
  styleUrl: './badge-pharmacy-representative.component.scss'
})
export class BadgePharmacyRepresentativeComponent {
  // Array to store the search results
  searchResults: PharmacyRepresentativeResponse[] = []

  // Method to handle and assign search results
  handleSearchResults(results: PharmacyRepresentativeResponse[]) {
    this.searchResults = results
  }
}
