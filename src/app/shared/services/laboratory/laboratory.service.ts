import { HttpClient, HttpParams } from '@angular/common/http'
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

  getLaboratoryByCorporateReason(corporateReason: string) : Observable<LaboratoryResponse> {
    const params = new HttpParams().set("corporateReason", corporateReason)
    const url = `${this.endpointLaboratoryUrl}/search-by-corporateReason`

    return this.http.get<LaboratoryResponse>(url, {params})
  }

  deleteLaboratory(laboratoryId: number) : Observable<void> {
    return this.http.delete<void>(`${this.endpointLaboratoryUrl}/${laboratoryId}`)
  }
}
