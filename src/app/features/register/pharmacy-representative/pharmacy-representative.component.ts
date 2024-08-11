import { Component } from '@angular/core';
import { FormPharmacyRepresentativeComponent } from "./form-pharmacy-representative/form-pharmacy-representative.component";

@Component({
  selector: 'app-pharmacy-representative',
  standalone: true,
  imports: [FormPharmacyRepresentativeComponent],
  templateUrl: './pharmacy-representative.component.html',
  styleUrl: './pharmacy-representative.component.scss'
})
export class PharmacyRepresentativeComponent {

}
