import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';
import { ReusableButtonComponent } from '../../../shared/components/buttons/reusable-button/reusable-button.component';
import { PharmacyRepresentativeService } from '../../../shared/services/pharmacyRepresentative/pharmacy-representative.service';
import { LaboratoryMemberResponse } from '../../../interfaces/laboratory/laboratory-member-response';
import { LaboratoryMemberService } from '../../../shared/services/laboratory/laboratory_member/laboratory-member.service';
import { catchError, forkJoin, of } from 'rxjs';
import { LaboratoryService } from '../../../shared/services/laboratory/laboratory.service';
import { LaboratoryResponse } from '../../../interfaces/laboratory/laboratory-response';

@Component({
  selector: 'search-entity-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ReusableButtonComponent],
  providers: [Router, provideNgxMask(), PharmacyRepresentativeService, LaboratoryMemberService, LaboratoryService],
  templateUrl: './search-entity.component.html',
  styleUrl: './search-entity.component.scss'
})
export class SearchEntityComponent {
  inputsForm: FormGroup; // Form group that holds the input fields for name and CPF
  @Output() event = new EventEmitter<(PharmacyRepresentativeResponse | LaboratoryMemberResponse | LaboratoryResponse)[]>(); // EventEmitter to emit search results
  private results: any = []

  constructor
  (
    private pharmacyRepresentativeService: PharmacyRepresentativeService,
    private laboratoryMemberService: LaboratoryMemberService,
    private laboratoryService: LaboratoryService,
    private router: Router
  ) {
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
      laboratory: new FormControl('',[
        Validators.required, // Name field is required
          this.noWhitespaceValidator(), // Custom validator to disallow only whitespace
          Validators.minLength(2), // Minimum length of 2 characters
          Validators.maxLength(100) // Maximum length of 100 characters
      ])
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
    const laboratory = this.inputsForm.value.laboratory;

    const filledFields = [name, cpf, laboratory].filter(field => field !== '').length;

    if (filledFields >= 2) {
      return;
    }
  
    if (name !== '') {
      forkJoin({
        pharmacyRepresentative: this.pharmacyRepresentativeService.getPharmacyRepresentative(name).pipe(
          catchError(() => of([])) // Retorna array vazio se falhar
        ),
        laboratoryMember: this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(name).pipe(
          catchError(() => of([])) // Retorna array vazio se falhar
        )
      }).subscribe({
        next: (result) => {
          // Combina os resultados de ambos os serviços
          const combinedResults = [...result.pharmacyRepresentative, ...result.laboratoryMember];
          
          // Emite os resultados combinados
          this.event.emit(combinedResults);
        },
      });
    }

    if (cpf !== '') {
      forkJoin({
        pharmacyRepresentative: this.pharmacyRepresentativeService.getPharmacyRepresentative(cpf).pipe(
          catchError(() => of([])) // Retorna array vazio se falhar
        ),
        laboratoryMember: this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(cpf).pipe(
          catchError(() => of([])) // Retorna array vazio se falhar
        )
      }).subscribe({
        next: (result) => {
          // Combina os resultados de ambos os serviços
          const combinedResults = [...result.pharmacyRepresentative, ...result.laboratoryMember];
          
          // Emite os resultados combinados
          this.event.emit(combinedResults);
        },
      });
    }

    if (laboratory !== '') {
      this.laboratoryService.getLaboratoryByCorporateReason(laboratory).subscribe({
        next: (laboratory) => {
          this.event.emit([laboratory]);
        }
      })
    }
  }
}
