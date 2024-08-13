import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-send-data-laboratory-component',
  standalone: true,
  imports: [],
  templateUrl: './button-send-data-laboratory.component.html',
  styleUrl: './button-send-data-laboratory.component.scss'
})
export class ButtonSendDataLaboratoryComponent {
  constructor(private router: Router) {}

  @Output("submitForm") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;

  submit() {
    this.onSubmit.emit();
  }
}
