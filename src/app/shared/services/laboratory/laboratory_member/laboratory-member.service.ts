import { Injectable } from '@angular/core'
import { environment } from '../../../../../environments/environment.development'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response'

@Injectable({
  providedIn: 'root'
})
export class LaboratoryMemberService {

  // Endpoint URL for laboratory member API
  private endpointLaboratyMemberUrl = `${environment.apiUrl}/laboratory-member`;

  constructor(private http: HttpClient) { }

  // Method to register a new laboratory member
  registerLaboratoryMember(
    name: string, 
    cpf: string, 
    laboratoryCorporateReason: string
  ): Observable<LaboratoryMemberResponse> {
    const data = { name, cpf, laboratoryCorporateReason }; // Prepare data for registration

    // Send a POST request to register the laboratory member and return the observable of the response
    return this.http.post<LaboratoryMemberResponse>(this.endpointLaboratyMemberUrl, data);
  }

  // Method to get laboratory members by name or CPF
  getLaboratoryMemberByNameOrCpf(nameOrCpf: string): Observable<LaboratoryMemberResponse[]> {
    const params = new HttpParams().set('nameOrCpf', nameOrCpf); // Set query parameter for search
    const url = `${this.endpointLaboratyMemberUrl}/search-by-name-or-cpf`; // Construct the URL for searching

    // Send a GET request to fetch laboratory members and return the observable of the response
    return this.http.get<LaboratoryMemberResponse[]>(url, { params });
  }

  // Method to generate a badge for a laboratory member
  generateLaboratoryMemberBadge(laboratoryMemberId: number): Observable<Blob> {
    const url = `${this.endpointLaboratyMemberUrl}/${laboratoryMemberId}/badge`; // Construct the URL for badge generation

    // Send a GET request to generate the badge and return the observable of the response as a Blob
    return this.http.get(url, { responseType: 'blob' });
  }
}
