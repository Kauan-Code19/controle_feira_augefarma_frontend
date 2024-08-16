import { Component } from '@angular/core';
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response';
import { AccordionLaboratoryMemberComponent } from './accordion-laboratory-member/accordion-laboratory-member.component';
import { SearchLaboratoryMemberComponent } from './search-laboratory-member/search-laboratory-member.component';

@Component({
  selector: 'app-badge-laboratory-member',
  standalone: true,
  imports: [SearchLaboratoryMemberComponent, AccordionLaboratoryMemberComponent],
  templateUrl: './badge-laboratory-member.component.html',
  styleUrl: './badge-laboratory-member.component.scss'
})
export class BadgeLaboratoryMemberComponent {
  searchResults: LaboratoryMemberResponse[] = [];

  handleSearchResults(results: LaboratoryMemberResponse[]) {
    this.searchResults = results;
  }
}
