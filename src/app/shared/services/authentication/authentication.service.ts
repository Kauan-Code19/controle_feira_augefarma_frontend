import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment.development'
import { Observable } from 'rxjs'
import { LoginResponse } from '../../../interfaces/authentication/login-response'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Endpoint URL for the login API
  private endpointLoginUrl = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) { }

  // Method to perform login with email and password
  login(email: string, password: string): Observable<LoginResponse> {
    // Prepare the data object to be sent in the login request
    const data = { email, password };

    // Send a POST request to the login endpoint and return the observable of the response
    return this.http.post<LoginResponse>(this.endpointLoginUrl, data);
  }
}
