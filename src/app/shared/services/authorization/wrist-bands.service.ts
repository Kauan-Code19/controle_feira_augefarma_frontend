import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WristbandsResponse } from '../../../interfaces/authentication/wristbands-response';

@Injectable({
  providedIn: 'root'
})
export class WristBandsService {

  // Endpoint URL for accessing the party wristband service
  private endpointAccessPartyUrl = `${environment.apiUrl}/access-party`;

  // Constructor for the service that initializes HttpClient
  constructor(private http: HttpClient) { }

  // Method to check the delivery status of a wristband with the given CPF
  checkDeliveryOfWristband(cpf: string): Observable<WristbandsResponse> {
    // Send a POST request to check wristband delivery and return the observable of the response
    return this.http.post<WristbandsResponse>(this.endpointAccessPartyUrl, { cpf });
  }
}
