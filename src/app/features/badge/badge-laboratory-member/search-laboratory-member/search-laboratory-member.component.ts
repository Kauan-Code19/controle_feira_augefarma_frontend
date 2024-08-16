import { Component, EventEmitter, Output } from '@angular/core';
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { LaboratoryMemberService } from '../../../../shared/services/laboratory/laboratory_member/laboratory-member.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ButtonSearchLaboratoryMemberComponent } from '../../../../shared/components/button-search-laboratory-member/button-search-laboratory-member.component';

@Component({
  selector: 'search-laboratory-member-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ButtonSearchLaboratoryMemberComponent],
  providers: [Router, provideNgxMask(), LaboratoryMemberService],
  templateUrl: './search-laboratory-member.component.html',
  styleUrl: './search-laboratory-member.component.scss'
})
export class SearchLaboratoryMemberComponent {
  inputsForm: FormGroup;
  @Output() results = new EventEmitter<LaboratoryMemberResponse[]>();

  constructor(private laboratoryMemberService: LaboratoryMemberService, private router: Router) {
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

    console.log("ok");
    
    
    if (this.inputsForm.value.name == '' && this.inputsForm.value.cpf != '') {
      this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(this.inputsForm.value.cpf)
      .subscribe(results => {
        this.results.emit(results)
      })
    } else if (this.inputsForm.value.name != '' && this.inputsForm.value.cpf == '') {
      this.laboratoryMemberService.getLaboratoryMemberByNameOrCpf(this.inputsForm.value.name)
      .subscribe(results => {
        this.results.emit(results)
      })
    }
  }
}
