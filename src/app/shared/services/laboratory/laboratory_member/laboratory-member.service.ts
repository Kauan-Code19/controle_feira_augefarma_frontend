import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryMemberService {

  private endpointUrl = `${environment.apiUrl}/laboratory-member`
  private endpointGetUrl = `${environment.apiUrl}/laboratory-member/search-by-name-or-cpf`

  constructor(private http: HttpClient) { }

  registerLaboratoryMember
  (
    name: string, cpf: string, laboratoryCorporateReason: string
  ) : Observable<LaboratoryMemberResponse>
  {
    const data = {name, cpf, laboratoryCorporateReason}

    return this.http.post<LaboratoryMemberResponse>(this.endpointUrl, data)
  }

  getLaboratoryMemberByNameOrCpf(nameOrCpf: string) : Observable<LaboratoryMemberResponse[]> {
    const params = new HttpParams().set('nameOrCpf', nameOrCpf)

    return this.http.get<LaboratoryMemberResponse[]>(this.endpointGetUrl, { params })
  }

  generateLaboratoryMemberBadge(laboratoryMemberId: number) : Observable<Blob> {
    const url = `${this.endpointUrl}/${laboratoryMemberId}/badge`;

    return this.http.get(url, { responseType: 'blob' })
  }
}
