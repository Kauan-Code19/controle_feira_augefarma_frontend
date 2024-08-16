import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-search-laboratory-member-component',
  standalone: true,
  imports: [],
  templateUrl: './button-search-laboratory-member.component.html',
  styleUrl: './button-search-laboratory-member.component.scss'
})
export class ButtonSearchLaboratoryMemberComponent {
  constructor() {}

  @Output("searchLaboratoryRepresentative") onSubmit = new EventEmitter();
  @Input() disabled: boolean = false;

  submit() {
    this.onSubmit.emit();
  }
}
