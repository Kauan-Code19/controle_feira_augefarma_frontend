import { Component } from '@angular/core';
import { PharmacyRepresentativeResponse } from '../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { BadgeContainerComponent } from '../../shared/components/html/badge-container/badge-container.component';
import { AccordionEntityComponent } from './accordion-entity/accordion-entity.component';
import { SearchEntityComponent } from './search-entity/search-entity.component';
import { LaboratoryMemberResponse } from '../../interfaces/laboratory/laboratory-member-response';
import { LaboratoryResponse } from '../../interfaces/laboratory/laboratory-response';

@Component({
  selector: 'delete-component',
  standalone: true,
  imports: [SearchEntityComponent, AccordionEntityComponent, BadgeContainerComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  // Array to store the search results
  searchResults: (PharmacyRepresentativeResponse | LaboratoryMemberResponse | LaboratoryResponse)[] = []

  // Method to handle and assign search results
  handleSearchResults(results: (PharmacyRepresentativeResponse | LaboratoryMemberResponse | LaboratoryResponse)[]) {
    this.searchResults = results
  }
}
