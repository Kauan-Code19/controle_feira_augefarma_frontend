import { Component, Input } from '@angular/core';

@Component({
  selector: 'register-container-component',
  standalone: true,
  imports: [],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss'
})
export class RegisterContainerComponent {
  @Input() title: string = ''; // Property to set the title
}
