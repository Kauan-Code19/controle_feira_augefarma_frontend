import { Component } from '@angular/core';
import { ButtonSendDataPharmacyRepresentativesComponent } from "../../../../shared/components/button-send-data-pharmacy-representatives/button-send-data-pharmacy-representatives.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'form-pharmacy-representative-component',
  standalone: true,
  imports: [ButtonSendDataPharmacyRepresentativesComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask()],
  templateUrl: './form-pharmacy-representative.component.html',
  styleUrl: './form-pharmacy-representative.component.scss'
})
export class FormPharmacyRepresentativeComponent {
  inputsForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.inputsForm = new FormGroup({
      name: new FormControl('', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
      cpf: new FormControl('', 
        [
          Validators.required, 
          Validators.pattern("^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$")
        ]),
      cnpj: new FormControl('', 
        [
          Validators.required,
          Validators.pattern("^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$")
        ]),
      corporate_reason:new FormControl('', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
    });

    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf && value.cpf.length === 11) {
        const formattedCPF = this.formatCPF(value.cpf);
        
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
      if (value.cnpj && value.cnpj.length === 14) {
        const formattedCNPJ = this.formatCNPJ(value.cnpj);
        this.inputsForm.get('cnpj')?.setValue(formattedCNPJ, {
          emitEvent: false,
        });
      }
    });
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatCNPJ(cnpj: string): string {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  submit() {
    
  }
}
