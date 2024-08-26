import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment.development'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ValidateEntryExitService {
  // Endpoint URL for validation API
  private endpointValidateUrl = `${environment.apiUrl}/validate`;

  constructor(private http: HttpClient) { }

  // Method to validate entry with CPF and event segment
  validateEntry(cpf: string, eventSegment: any): Observable<any> {
    const url = `${this.endpointValidateUrl}/entry`; // Construct the URL for entry validation
    const params = new HttpParams().set('eventSegment', eventSegment); // Set the event segment as a query parameter

    // Send a POST request to validate entry and return the observable of the response
    return this.http.post<any>(url, { cpf }, { params });
  }

  // Method to validate exit with CPF
  validateExit(cpf: string): Observable<any> {
    const url = `${this.endpointValidateUrl}/exit`; // Construct the URL for exit validation

    // Send a POST request to validate exit and return the observable of the response
    return this.http.post<any>(url, { cpf });
  }
}
