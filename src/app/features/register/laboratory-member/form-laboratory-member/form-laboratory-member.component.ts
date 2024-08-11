import { Component } from '@angular/core';
import { ButtonSendDataLaboratoryMembersComponent } from "../../../../shared/components/button-send-data-laboratory-members/button-send-data-laboratory-members.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service';

@Component({
  selector: 'form-laboratory-member-component',
  standalone: true,
  imports: [ButtonSendDataLaboratoryMembersComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask(), LaboratoryMemberService],
  templateUrl: './form-laboratory-member.component.html',
  styleUrl: './form-laboratory-member.component.scss'
})
export class FormLaboratoryMemberComponent {
  inputsForm: FormGroup;

  constructor(private laboratoryMemberService: LaboratoryMemberService, private router: Router) {
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
      laboratory:new FormControl('', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
    });

    this.inputsForm.valueChanges.subscribe(value => {
      if (value.cpf) {
        const formattedCPF = this.formatCPF(value.cpf);
        
        this.inputsForm.get('cpf')?.setValue(formattedCPF, {
          emitEvent: false,
        });
      }
    });
  }

  formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  submit() {

    if (this.inputsForm.valid) {
      this.laboratoryMemberService.registerLaboratoryMember
      (
        this.inputsForm.value.name,
        this.inputsForm.value.cpf,
        this.inputsForm.value.laboratory,
      ).subscribe({
        next: (response) => {
          alert(`${response.name} registered successfully!`)

          // this.router.navigateByUrl("/generate-badge/pharmacy-representative")
        },
        error() {
          
        },
      })
    }
  }
}
