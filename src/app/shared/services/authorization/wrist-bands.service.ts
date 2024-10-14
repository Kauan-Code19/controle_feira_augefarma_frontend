import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WristBandsService {

  // Endpoint URL for accessing the party wristband service
  private endpointAccessPartyUrl = `${environment.apiUrl}/access-party`;

  // Constructor for the service that initializes HttpClient
  constructor(private http: HttpClient) { }

  // Method to check the delivery status of a wristband with the given CPF
  checkDeliveryOfWristband(cpf: string): Observable<any> {
    // Send a POST request to check wristband delivery and return the observable of the response
    return this.http.post<any>(this.endpointAccessPartyUrl, { cpf });
  }
}
