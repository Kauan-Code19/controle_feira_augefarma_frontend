import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonSendDataAdministratorsComponent } from '../../../shared/components/button-send-data-administrators/button-send-data-administrators.component';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../interfaces/authentication/login-response';

@Component({
  selector: 'form-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonSendDataAdministratorsComponent],
  providers: [AuthenticationService, Router],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  inputsForm: FormGroup<{ email: any; password: any; }>;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.inputsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
       [Validators.required, 
        Validators.minLength(8), 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).*$')]),
    });
  }

  submit() {
    if (this.inputsForm.valid) {
      
      this.authenticationService.login(this.inputsForm.value.email, this.inputsForm.value.password)
      .subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem("token", response.token)

          this.router.navigateByUrl("/mapping")
        }
      })
    }
  }
}
