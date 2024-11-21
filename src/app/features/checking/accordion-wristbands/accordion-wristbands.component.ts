import { Component, Input } from '@angular/core';
import { WristbandsResponse } from '../../../interfaces/authentication/wristbands-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'accordion-wristbands-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-wristbands.component.html',
  styleUrl: './accordion-wristbands.component.scss'
})
export class AccordionWristbandsComponent {
  @Input() WristbandsResult: WristbandsResponse | undefined;

  constructor() {}
}
