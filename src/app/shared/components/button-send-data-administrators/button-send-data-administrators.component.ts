import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-send-data-administrators-component',
  standalone: true,
  imports: [CommonModule],
  providers: [Router],
  templateUrl: './button-send-data-administrators.component.html',
  styleUrl: './button-send-data-administrators.component.scss'
})
export class ButtonSendDataAdministratorsComponent {
  constructor(private router: Router) {}

  @Output("submitForm") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;
  @Input("btn-text") btnText: string = ""

  submit() {
    this.onSubmit.emit();
  }

  getButtonText(): string {
    if (this.router.url === '/login') {
      return this.btnText;
    } else if (this.router.url === '/register') {
      return 'Register';
    } else {
      return 'Edit';
    }
  }

  getButtonClass(): string {
    if (this.router.url === '/login') {
      return 'btn-text-primary';
    } else {
      return 'btn-text-secondary';
    }
  }
  
}
