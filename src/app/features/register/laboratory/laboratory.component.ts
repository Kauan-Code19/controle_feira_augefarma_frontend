import { Component } from '@angular/core'
import { FormLaboratoryComponent } from "./form-laboratory/form-laboratory.component"
import { RegisterContainerComponent } from "../../../shared/components/html/register-container/register-container.component";

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [FormLaboratoryComponent, RegisterContainerComponent],
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.scss'
})
export class LaboratoryComponent {

}
