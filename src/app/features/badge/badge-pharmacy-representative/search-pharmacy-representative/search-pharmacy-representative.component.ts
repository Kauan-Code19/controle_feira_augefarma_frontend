import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { PharmacyRepresentativeService } from '../../../../shared/services/pharmacyRepresentative/pharmacy-representative.service'
import { PharmacyRepresentativeResponse } from '../../../../interfaces/pharmacy_representative/pharmacy-representative-response'
import { ReusableButtonComponent } from "../../../../shared/components/buttons/reusable-button/reusable-button.component"

@Component({
  selector: 'search-pharmacy-representative-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, ReusableButtonComponent],
  providers: [Router, provideNgxMask(), PharmacyRepresentativeService],
  templateUrl: './search-pharmacy-representative.component.html',
  styleUrl: './search-pharmacy-representative.component.scss'
})
export class SearchPharmacyRepresentativeComponent {
  inputsForm: FormGroup; // Form group that holds the input fields for name and CPF
  @Output() results = new EventEmitter<PharmacyRepresentativeResponse[]>(); // EventEmitter to emit search results

  constructor(private pharmacyRepresentativeService: PharmacyRepresentativeService, private router: Router) {
    // Initialize the form group with name and CPF fields, along with their validators
    this.inputsForm = new FormGroup({
      name: new FormControl('', 
        [
          Validators.required, // Name field is required
          this.noWhitespaceValidator(), // Custom validator to disallow only whitespace
          Validators.minLength(2), // Minimum length of 2 characters
          Validators.maxLength(100) // Maximum length of 100 characters
        ]),
      cpf: new FormControl('', 
        [
          Validators.required, // CPF field is required
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$") // Pattern to match CPF format (XXX.XXX.XXX-XX)
        ]),
    });

    // Subscribe to value changes in the form to auto-format CPF input
    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf && value.cpf.length === 11) {
        const formattedCPF = this.formatCPF(value.cpf);
        
        // Set the formatted CPF back to the form control without triggering another value change event
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
    });
  }

  // Method to format CPF to XXX.XXX.XXX-XX
  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Custom validator to check for only whitespace input
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.trim().length === 0) {
        return { 'whitespace': true }; // Returns an error object if value contains only whitespace
      }
      return null;
    };
  }

  submit() {
    // Get the values from the form
    const name = this.inputsForm.value.name;
    const cpf = this.inputsForm.value.cpf;
  
    // If both name and CPF are provided, do nothing
    if (name !== '' && cpf !== '') {
      return;
    }
  
    // If only CPF is provided, fetch pharmacy representative by CPF
    if (cpf !== '' && this.inputsForm.get('cpf')?.valid) {
      this.pharmacyRepresentativeService.getPharmacyRepresentative(cpf)
        .subscribe(results => {
          this.results.emit(results); // Emit the results
        });
      return;
    }
  
    // If only name is provided, fetch pharmacy representative by name
    if (name !== '' && this.inputsForm.get('name')?.valid) {
      this.pharmacyRepresentativeService.getPharmacyRepresentative(name)
        .subscribe(results => {
          this.results.emit(results); // Emit the results
        });
    }
  }
}
