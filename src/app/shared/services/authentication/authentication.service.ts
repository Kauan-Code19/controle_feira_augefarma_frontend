import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../interfaces/authentication/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpointLoginUrl = `${environment.apiUrl}/login`

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<LoginResponse> {
    const data = {email, password};

    return this.http.post<LoginResponse>(this.endpointLoginUrl, data);
  }
}
