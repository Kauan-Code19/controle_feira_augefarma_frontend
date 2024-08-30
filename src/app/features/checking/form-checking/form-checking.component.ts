import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { ReusableButtonComponent } from '../../../shared/components/buttons/reusable-button/reusable-button.component'

@Component({
  selector: 'form-checking-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ReusableButtonComponent],
  providers: [Router, provideNgxMask(),],
  templateUrl: './form-checking.component.html',
  styleUrl: './form-checking.component.scss'
})
export class FormCheckingComponent {
  inputsForm: FormGroup; // Form group for handling form controls
  @Output() manualCpf = new EventEmitter<string>(); // Event emitter for manual CPF emission

  constructor(private router: Router) {
    // Initialize the form group with CPF control and its validators
    this.inputsForm = new FormGroup({
      cpf: new FormControl('', 
        [
          Validators.required, // CPF is required
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$") // CPF must match the specific pattern
        ]),
    });

    // Subscribe to value changes in the form
    this.inputsForm.valueChanges.subscribe(value => {
      // If CPF is provided and has 11 characters
      if (value.cpf && value.cpf.length === 11) {
        const formattedCPF = this.formatCPF(value.cpf); // Format the CPF
        
        // Update the CPF control value without emitting the event
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false, // Prevent emitting the value change event
        });
      }
    });
  }

  // Method to format CPF into the desired pattern
  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Replace with formatted string
  }

  // Method to emit the current CPF value
  emitManualCpf() {
    this.manualCpf.emit(this.inputsForm.value.cpf); // Emit the current CPF value
  }
}
