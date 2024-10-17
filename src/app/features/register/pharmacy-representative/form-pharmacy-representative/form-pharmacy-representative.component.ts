import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { PharmacyRepresentativeService } from '../../../../shared/services/pharmacyRepresentative/pharmacy-representative.service'
import { ButtonSendDataComponent } from '../../../../shared/components/buttons/button-send-data/button-send-data.component'

@Component({
  selector: 'form-pharmacy-representative-component',
  standalone: true,
  imports: [ButtonSendDataComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask(), PharmacyRepresentativeService],
  templateUrl: './form-pharmacy-representative.component.html',
  styleUrl: './form-pharmacy-representative.component.scss'
})
export class FormPharmacyRepresentativeComponent {
  // Form group to manage the pharmacy representative registration inputs
  inputsForm: FormGroup;

  constructor(private pharmacyRepresentativeService: PharmacyRepresentativeService, private router: Router) {
    // Initialize the form group with validation rules for name, CPF, CNPJ, and corporate reason
    this.inputsForm = new FormGroup({
      name: new FormControl('', 
        [
          Validators.required, // Name field is required
          Validators.minLength(2), // Minimum length of 2 characters for name
          Validators.maxLength(100) // Maximum length of 100 characters for name
        ]),
      cpf: new FormControl('', 
        [
          Validators.required, // CPF field is required
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$") // CPF must match the specified pattern
        ]),
      cnpj: new FormControl('', 
        [
          Validators.required, // CNPJ field is required
          Validators.pattern("^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$") // CNPJ must match the specified pattern
        ]),
      corporateReason: new FormControl('', 
        [
          Validators.required, // Corporate reason field is required
          Validators.minLength(2), // Minimum length of 2 characters for corporate reason
          Validators.maxLength(100) // Maximum length of 100 characters for corporate reason
        ])
    });

    // Subscribe to value changes in the form
    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf && value.cpf.length === 11) {
        // Format CPF if it has 11 digits
        const formattedCPF = this.formatCPF(value.cpf);
        
        // Update the CPF field value without emitting an event
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
      if (value.cnpj && value.cnpj.length === 14) {
        // Format CNPJ if it has 14 digits
        const formattedCNPJ = this.formatCNPJ(value.cnpj);
        // Update the CNPJ field value without emitting an event
        this.inputsForm.get('cnpj')?.setValue(formattedCNPJ, {
          emitEvent: false,
        });
      }
    });
  }

  // Method to format CPF into the standard pattern
  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Method to format CNPJ into the standard pattern
  formatCNPJ(cnpj: string): string {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  // Method to handle form submission
  submit() {
    // Check if the form is valid
    if (this.inputsForm.valid) {
      // Call the pharmacy representative service to register the representative with the provided details
      this.pharmacyRepresentativeService.registerPharmacyRepresentative(
        this.inputsForm.value.name,
        this.inputsForm.value.cpf,
        this.inputsForm.value.cnpj,
        this.inputsForm.value.corporateReason,
      ).subscribe({
        next: (response) => {
          // Alert the user that the pharmacy representative has been registrado com sucesso
          alert(`${response.name} registrado com sucesso!`);

          // Navigate to the pharmacy representative badge generation page after successful registration
          this.router.navigateByUrl("/generate-badge/pharmacy-representative");
        },
        error() {
          // Alert the user if the CPF is already registered
          alert(`CPF já registrado`);
        },
      });
    }
  }
}
