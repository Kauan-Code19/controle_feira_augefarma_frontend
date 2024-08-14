import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-search-pharmacy-representative',
  standalone: true,
  imports: [],
  templateUrl: './button-search-pharmacy-representative.component.html',
  styleUrl: './button-search-pharmacy-representative.component.scss'
})
export class ButtonSearchPharmacyRepresentativeComponent {
  constructor() {}

  @Output("searchPharmacyRepresentative") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;

  submit() {
    this.onSubmit.emit();
  }
}
