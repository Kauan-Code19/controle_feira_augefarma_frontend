import { Component } from '@angular/core';
import { FormLaboratoryMemberComponent } from "./form-laboratory-member/form-laboratory-member.component";

@Component({
  selector: 'laboratory-member-component',
  standalone: true,
  imports: [FormLaboratoryMemberComponent],
  templateUrl: './laboratory-member.component.html',
  styleUrl: './laboratory-member.component.scss'
})
export class LaboratoryMemberComponent {

}
