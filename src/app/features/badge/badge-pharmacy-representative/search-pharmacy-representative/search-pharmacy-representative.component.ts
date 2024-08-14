import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ButtonSearchPharmacyRepresentativeComponent } from "../../../../shared/components/button-search-pharmacy-representative/button-search-pharmacy-representative.component";
import { PharmacyRepresentativeService } from '../../../../shared/services/pharmacyRepresentative/pharmacy-representative.service';
import { PharmacyRepresentativeResponse } from '../../../../interfaces/pharmacy_representative/pharmacy-representative-response';

@Component({
  selector: 'search-pharmacy-representative-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ButtonSearchPharmacyRepresentativeComponent],
  providers: [Router, provideNgxMask(), PharmacyRepresentativeService],
  templateUrl: './search-pharmacy-representative.component.html',
  styleUrl: './search-pharmacy-representative.component.scss'
})
export class SearchPharmacyRepresentativeComponent {
  inputsForm: FormGroup;
  @Output() results = new EventEmitter<PharmacyRepresentativeResponse[]>();

  constructor(private pharmacyRepresentativeService: PharmacyRepresentativeService, private router: Router) {
    this.inputsForm = new FormGroup({
      name: new FormControl('', 
        [
          Validators.required,
          this.noWhitespaceValidator(),
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      cpf: new FormControl('', 
        [
          Validators.required, 
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$")
        ]),
    });

    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf && value.cpf.length === 11) {
        const formattedCPF = this.formatCPF(value.cpf);
        
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });

        console.log(this.inputsForm.value.cpf);
        
      }
    });
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.trim().length === 0) {
        return { 'whitespace': true }; // Returns an error object if value contains only whitespace
      }
      return null; // Valid value
    }
  }

  submit() {
    
    if (this.inputsForm.value.name == '' && this.inputsForm.value.cpf != '') {
      this.pharmacyRepresentativeService.getPharmacyRepresentative(this.inputsForm.value.cpf)
      .subscribe(results => {
        this.results.emit(results)
      })
    } else if (this.inputsForm.value.name != '' && this.inputsForm.value.cpf == '') {
      this.pharmacyRepresentativeService.getPharmacyRepresentative(this.inputsForm.value.name)
      .subscribe(results => {
        this.results.emit(results)
      })
    }
  }
}
