import { Component } from '@angular/core'
import { FormPharmacyRepresentativeComponent } from "./form-pharmacy-representative/form-pharmacy-representative.component"
import { RegisterContainerComponent } from "../../../shared/components/html/register-container/register-container.component";

@Component({
  selector: 'app-pharmacy-representative',
  standalone: true,
  imports: [FormPharmacyRepresentativeComponent, RegisterContainerComponent],
  templateUrl: './pharmacy-representative.component.html',
  styleUrl: './pharmacy-representative.component.scss'
})
export class PharmacyRepresentativeComponent {

}
