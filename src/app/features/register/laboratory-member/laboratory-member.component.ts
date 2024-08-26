import { Component } from '@angular/core'
import { FormLaboratoryMemberComponent } from "./form-laboratory-member/form-laboratory-member.component"
import { RegisterContainerComponent } from "../../../shared/components/html/register-container/register-container.component";

@Component({
  selector: 'laboratory-member-component',
  standalone: true,
  imports: [FormLaboratoryMemberComponent, RegisterContainerComponent],
  templateUrl: './laboratory-member.component.html',
  styleUrl: './laboratory-member.component.scss'
})
export class LaboratoryMemberComponent {

}
