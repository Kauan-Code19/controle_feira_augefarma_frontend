import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-send-data-pharmacy-representatives-component',
  standalone: true,
  imports: [],
  providers: [Router],
  templateUrl: './button-send-data-pharmacy-representatives.component.html',
  styleUrl: './button-send-data-pharmacy-representatives.component.scss'
})
export class ButtonSendDataPharmacyRepresentativesComponent {
  constructor(private router: Router) {}

  @Output("submitForm") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;

  submit() {
    this.onSubmit.emit();
  }
}
