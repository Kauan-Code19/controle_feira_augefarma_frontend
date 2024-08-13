import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ButtonSendDataLaboratoryComponent } from '../../../../shared/components/button-send-data-laboratory/button-send-data-laboratory.component';
import { Router } from '@angular/router';
import { LaboratoryService } from '../../../../shared/services/laboratory/laboratory.service';

@Component({
  selector: 'form-laboratory-component',
  standalone: true,
  imports: [ButtonSendDataLaboratoryComponent, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [Router, provideNgxMask(), LaboratoryService],
  templateUrl: './form-laboratory.component.html',
  styleUrl: './form-laboratory.component.scss'
})
export class FormLaboratoryComponent {
  inputsForm: FormGroup;

  constructor(private laboratoryService: LaboratoryService, private router: Router) {
    this.inputsForm = new FormGroup({
      corporateReason: new FormControl('', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
    });
  }

  submit() {

    if (this.inputsForm.valid) {
      this.laboratoryService.registerLaboratory(this.inputsForm.value.corporateReason).subscribe({
        next: (response) => {
          alert(`${response.corporateReason} registered successfully!`)

          this.router.navigateByUrl("/register/laboratory-member")
        }
      })
    }
  }
}
