import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { LaboratoryResponse } from '../../../interfaces/laboratory/laboratory-response';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {
  private endpointRegisterUrl = `${environment.apiUrl}/laboratory`

  constructor(private http: HttpClient) { }

  registerLaboratory(corporateReason: string) : Observable<LaboratoryResponse> {
    return this.http.post<LaboratoryResponse>(this.endpointRegisterUrl, {corporateReason})
  }
}
