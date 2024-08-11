import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaboratoryMemberResponse } from '../../../../interfaces/laboratory/laboratory-member-response';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryMemberService {

  private endpointRegisterUrl = `${environment.apiUrl}/laboratory-member`

  constructor(private http: HttpClient) { }

  registerLaboratoryMember
  (
    name: string, cpf: string, laboratoryCorporateReason: string
  ) : Observable<LaboratoryMemberResponse>
  {
    const data = {name, cpf, laboratoryCorporateReason}

    return this.http.post<LaboratoryMemberResponse>(this.endpointRegisterUrl, data)
  }
}
