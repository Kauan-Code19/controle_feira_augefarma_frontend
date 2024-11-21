import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service'
import { Router } from '@angular/router'
import { LoginResponse } from '../../../interfaces/authentication/login-response'
import { ButtonSendDataComponent } from '../../../shared/components/buttons/button-send-data/button-send-data.component'

@Component({
  selector: 'form-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonSendDataComponent],
  providers: [AuthenticationService, Router],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {
  // Form group to manage the login inputs: email and password
  inputsForm: FormGroup<{ email: any; password: any }>;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    // Initialize the form group with validation rules for email and password
    this.inputsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Email field with required and email format validation
      password: new FormControl('',
        [
          Validators.required, // Password field is required
          Validators.minLength(8), // Minimum length of 8 characters for password
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).*$') // Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character
        ]),
    });
  }

  // Method to handle form submission
  submit() {
    // Check if the form is valid
    if (this.inputsForm.valid) {
      // Call the authentication service to log in with email and password
      this.authenticationService.login(this.inputsForm.value.email, this.inputsForm.value.password)
        .subscribe({
          next: (response: LoginResponse) => {
            const token = response.token; // Get the token from the response
            const expirationDate = this.decodeTokenExpiration(token); // Decode the expiration date from the token

            // Store the token and expiration date in local storage
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("tokenExpiration", expirationDate.toString());
            sessionStorage.setItem("role", response.role);

            // Navigate to the mapping page after successful login
            this.router.navigateByUrl("/mapping");
          }
        });
    }
  }

  // Method to decode the expiration date from the JWT token
  decodeTokenExpiration(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload of the token
    return payload.exp * 1000; // Return the expiration date in milliseconds
  }
}
