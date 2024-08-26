import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'button-send-data-component',
  standalone: true,
  imports: [],
  templateUrl: './button-send-data.component.html',
  styleUrl: './button-send-data.component.scss'
})
export class ButtonSendDataComponent {
  // Output event to emit when the button is clicked
  @Output() submitForm = new EventEmitter<void>()

  // Input property to enable/disable the button
  @Input() disabled: boolean = false

  // Input property to define the button text
  @Input() btnText: string = "Register"

  // Method to emit the submit event
  submit(): void {
    this.submitForm.emit()
  }
}
