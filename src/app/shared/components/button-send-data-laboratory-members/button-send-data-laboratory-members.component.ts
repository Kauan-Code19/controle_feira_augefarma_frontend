import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-send-data-laboratory-members-component',
  standalone: true,
  imports: [],
  templateUrl: './button-send-data-laboratory-members.component.html',
  styleUrl: './button-send-data-laboratory-members.component.scss'
})
export class ButtonSendDataLaboratoryMembersComponent {
  constructor(private router: Router) {}

  @Output("submitForm") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;

  submit() {
    this.onSubmit.emit();
  }
}
