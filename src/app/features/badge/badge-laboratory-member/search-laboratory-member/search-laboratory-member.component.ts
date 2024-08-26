import { Component, EventEmitter, Output } from '@angular/core'
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response'
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms'
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service'
import { Router } from '@angular/router'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'
import { ReusableButtonComponent } from '../../../../shared/components/buttons/reusable-button/reusable-button.component'

@Component({
  selector: 'search-laboratory-member-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ReusableButtonComponent],
  providers: [Router, provideNgxMask(), LaboratoryMemberService],
  templateUrl: './search-laboratory-member.component.html',
  styleUrl: './search-laboratory-member.component.scss'
})
export class SearchLaboratoryMemberComponent {
  // FormGroup to manage the inputs for the laboratory member search
  inputsForm: FormGroup;

  // Output event emitter to send search results back to the parent component
  @Output() results = new EventEmitter<LaboratoryMemberResponse[]>();

  constructor(private laboratoryMemberService: LaboratoryMemberService, private router: Router) {
    // Initialize the form with validators
    this.inputsForm = new FormGroup({
      name: new FormControl('', 
        [
          Validators.required, // Name is required
          this.noWhitespaceValidator(), // Custom validator to check for whitespace
          Validators.minLength(2), // Minimum length of 2 characters
          Validators.maxLength(100) // Maximum length of 100 characters
        ]),
      cpf: new FormControl('', 
        [
          Validators.required, // CPF is required
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$") // Pattern for validating CPF format
        ]),
    });

    // Subscribe to value changes in the form
    this.inputsForm.valueChanges.subscribe(value => {
      // Format CPF if it has the correct length
      if (value.cpf && value.cpf.length === 11) {
        const formattedCPF = this.formatCPF(value.cpf);

        // Update the CPF field with the formatted value without emitting an event
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
    });
  }

  // Method to format the CPF string
  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Format CPF into xxx.xxx.xxx-xx
  }

  // Custom validator to check for whitespace
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Return an error if the value is only whitespace
      if (control.value && control.value.trim().length === 0) {
        return { 'whitespace': true };
      }
      return null; // No error
    }
  }

  // Method to submit the form
  submit() {
    const name = this.inputsForm.value.name; // Get the name input value
    const cpf = this.inputsForm.value.cpf; // Get the CPF input value

    // If both name and CPF are provided, do nothing
    if (name !== '' && cpf !== '') {
      return;
    }

    // If only CPF is provided, fetch laboratory member by CPF
    if (cpf !== '') {
      this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(cpf)
        .subscribe(results => {
          this.results.emit(results); // Emit the results
        });
      return;
    }

    // If only name is provided, fetch laboratory member by name
    if (name !== '') {
      this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(name)
        .subscribe(results => {
          this.results.emit(results); // Emit the results
        });
    }
  }
}
