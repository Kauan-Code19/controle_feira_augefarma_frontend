import { Component } from '@angular/core';
import { FormLaboratoryComponent } from "./form-laboratory/form-laboratory.component";

@Component({
  selector: 'app-laboratory',
  standalone: true,
  imports: [FormLaboratoryComponent],
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.scss'
})
export class LaboratoryComponent {

}
