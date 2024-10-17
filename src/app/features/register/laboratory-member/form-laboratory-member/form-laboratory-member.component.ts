import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service'
import { ButtonSendDataComponent } from '../../../../shared/components/buttons/button-send-data/button-send-data.component'

@Component({
  selector: 'form-laboratory-member-component',
  standalone: true,
  imports: [ButtonSendDataComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask(), LaboratoryMemberService],
  templateUrl: './form-laboratory-member.component.html',
  styleUrl: './form-laboratory-member.component.scss'
})
export class FormLaboratoryMemberComponent {
  // Form group to manage the laboratory member registration inputs
  inputsForm: FormGroup;

  constructor(private laboratoryMemberService: LaboratoryMemberService, private router: Router) {
    // Initialize the form group with validation rules for name, CPF, and laboratory
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
      laboratory: new FormControl('', 
        [
          Validators.required, // Laboratory field is required
          Validators.minLength(2), // Minimum length of 2 characters for laboratory
          Validators.maxLength(100) // Maximum length of 100 characters for laboratory
        ])
    });

    // Subscribe to value changes in the form
    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf) {
        // Format CPF if it is provided
        const formattedCPF = this.formatCPF(value.cpf);
        
        // Update the CPF field value without emitting an event
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
    });
  }

  // Method to format CPF into the standard pattern
  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Method to handle form submission
  submit() {
    // Check if the form is valid
    if (this.inputsForm.valid) {
      // Call the laboratory member service to register the member with the provided details
      this.laboratoryMemberService.registerLaboratoryMember(
        this.inputsForm.value.name,
        this.inputsForm.value.cpf,
        this.inputsForm.value.laboratory,
      ).subscribe({
        next: (response) => {
          // Alert the user that the laboratory member has been registrado com sucesso
          alert(`${response.name} registrado com sucesso!`);

          // Navigate to the laboratory member badge generation page after successful registration
          this.router.navigateByUrl("/generate-badge/laboratory-member");
        },

        error() {
          // Alert the user if the CPF is already registered
          alert(`CPF já registrado`);
        },
      });
    }
  }
}
