import { Component } from '@angular/core'
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response'
import { AccordionLaboratoryMemberComponent } from './accordion-laboratory-member/accordion-laboratory-member.component'
import { SearchLaboratoryMemberComponent } from './search-laboratory-member/search-laboratory-member.component'
import { BadgeContainerComponent } from "../../../shared/components/html/badge-container/badge-container.component";

@Component({
  selector: 'badge-laboratory-member-component',
  standalone: true,
  imports: [SearchLaboratoryMemberComponent, AccordionLaboratoryMemberComponent, BadgeContainerComponent],
  templateUrl: './badge-laboratory-member.component.html',
  styleUrl: './badge-laboratory-member.component.scss'
})
export class BadgeLaboratoryMemberComponent {
  // Array to store the search results
  searchResults: LaboratoryMemberResponse[] = [];

  // Method to handle and assign search results
  handleSearchResults(results: LaboratoryMemberResponse[]) {
    this.searchResults = results;
  }
}
