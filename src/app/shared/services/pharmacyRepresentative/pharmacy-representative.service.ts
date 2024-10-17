import { Injectable } from '@angular/core'
import { environment } from '../../../../environments/environment.development'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response'

@Injectable({
  providedIn: 'root'
})
export class PharmacyRepresentativeService {

  // Endpoint URL for pharmacy representative API
  private endpointPharmacyRepresentativeUrl = `${environment.apiUrl}/pharmacy-representative`;

  constructor(private http: HttpClient) { }

  // Method to register a new pharmacy representative
  registerPharmacyRepresentative(
    name: string, cpf: string, cnpj: string, corporateReason: string
  ): Observable<PharmacyRepresentativeResponse> {
    // Create data object with the pharmacy representative's details
    const data = { name, cpf, cnpj, corporateReason };

    // Send a POST request to register the pharmacy representative and return the observable of the response
    return this.http.post<PharmacyRepresentativeResponse>(this.endpointPharmacyRepresentativeUrl, data);
  }

  // Method to get a pharmacy representative by name or CPF
  getPharmacyRepresentative(nameOrCpf: string): Observable<PharmacyRepresentativeResponse[]> {
    // Set the search parameter for the request
    const params = new HttpParams().set('nameOrCpf', nameOrCpf);
    const url = `${this.endpointPharmacyRepresentativeUrl}/search-by-name-or-cpf`;

    // Send a GET request to retrieve the pharmacy representative details and return the observable
    return this.http.get<PharmacyRepresentativeResponse[]>(url, { params });
  }

  // Method to generate a badge for a pharmacy representative
  generatePharmacyRepresentativeBadge(pharmacyRepresentativeId: number): Observable<Blob> {
    const url = `${this.endpointPharmacyRepresentativeUrl}/${pharmacyRepresentativeId}/badge`;

    // Send a GET request to retrieve the badge as a blob and return the observable
    return this.http.get(url, { responseType: 'blob' });
  }
  
  deletePharmacyRepresentative(pharmacyRepresentativeId: number) : Observable<void> {
    return this.http.delete<void>(`${this.endpointPharmacyRepresentativeUrl}/${pharmacyRepresentativeId}`)
  }
}
