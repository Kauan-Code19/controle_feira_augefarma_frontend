import { Component, Input } from '@angular/core';

@Component({
  selector: 'badge-container-component',
  standalone: true,
  imports: [],
  templateUrl: './badge-container.component.html',
  styleUrl: './badge-container.component.scss'
})
export class BadgeContainerComponent {
  @Input() title: string = ''; // Property to set the title
}
