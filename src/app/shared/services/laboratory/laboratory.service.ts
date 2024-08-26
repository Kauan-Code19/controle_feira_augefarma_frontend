import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment.development'
import { LaboratoryResponse } from '../../../interfaces/laboratory/laboratory-response'

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  // Endpoint URL for laboratory API
  private endpointLaboratoryUrl = `${environment.apiUrl}/laboratory`;

  constructor(private http: HttpClient) { }

  // Method to register a new laboratory
  registerLaboratory(corporateReason: string): Observable<LaboratoryResponse> {
    // Send a POST request to register the laboratory with the corporate reason and return the observable of the response
    return this.http.post<LaboratoryResponse>(this.endpointLaboratoryUrl, { corporateReason });
  }
}
