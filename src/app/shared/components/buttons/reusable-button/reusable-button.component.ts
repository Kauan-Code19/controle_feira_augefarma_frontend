import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'reusable-button-component',
  standalone: true,
  imports: [],
  templateUrl: './reusable-button.component.html',
  styleUrl: './reusable-button.component.scss'
})
export class ReusableButtonComponent {
  // Input properties for the button component
  @Input() disabled: boolean = false // Determines if the button is disabled
  @Input() btnText: string = 'Submit' // Text displayed on the button

  // Output event emitter for button click events
  @Output() buttonClick = new EventEmitter<void>()

  // Emit the buttonClick event when the button is clicked
  submit() {
    this.buttonClick.emit()
  }
}
