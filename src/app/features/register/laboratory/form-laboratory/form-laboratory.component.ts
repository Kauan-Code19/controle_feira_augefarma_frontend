import { Component } from '@angular/core'
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { Router } from '@angular/router'
import { LaboratoryService } from '../../../../shared/services/laboratory/laboratory.service'
import { ButtonSendDataComponent } from '../../../../shared/components/buttons/button-send-data/button-send-data.component'

@Component({
  selector: 'form-laboratory-component',
  standalone: true,
  imports: [ButtonSendDataComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask(), LaboratoryService],
  templateUrl: './form-laboratory.component.html',
  styleUrl: './form-laboratory.component.scss'
})
export class FormLaboratoryComponent {
  // Form group to manage the laboratory registration inputs
  inputsForm: FormGroup;

  constructor(private laboratoryService: LaboratoryService, private router: Router) {
    // Initialize the form group with validation rules for corporate reason
    this.inputsForm = new FormGroup({
      corporateReason: new FormControl('', 
        [
          Validators.required, // Corporate reason field is required
          Validators.minLength(2), // Minimum length of 2 characters for corporate reason
          Validators.maxLength(100) // Maximum length of 100 characters for corporate reason
        ]),
    });
  }

  // Method to handle form submission
  submit() {
    // Check if the form is valid
    if (this.inputsForm.valid) {
      // Call the laboratory service to register the laboratory with the provided corporate reason
      this.laboratoryService.registerLaboratory(this.inputsForm.value.corporateReason).subscribe({
        next: (response) => {
          // Alert the user that the laboratory has been registrado com sucesso
          alert(`${response.corporateReason} registrado com sucesso!`);

          // Navigate to the laboratory member registration page after successful registration
          this.router.navigateByUrl("/register/laboratory-member");
        },

        error() {
          // Alert the user if the CPF is already registered
          alert(`laboratorio já registrado`);
        },
      });
    }
  }
}
