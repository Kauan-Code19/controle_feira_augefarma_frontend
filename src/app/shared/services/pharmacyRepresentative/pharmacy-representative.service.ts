import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';

@Injectable({
  providedIn: 'root'
})
export class PharmacyRepresentativeService {

  private endpointRegisterUrl = `${environment.apiUrl}/pharmacy-representative`

  constructor(private http: HttpClient) { }

  registerPharmacyRepresentative
  (
    name: string, cpf: string, cnpj: string, corporateReason: string
  ) : Observable<PharmacyRepresentativeResponse>

  {
    const data = {name, cpf, cnpj, corporateReason}

    return this.http.post<PharmacyRepresentativeResponse>(this.endpointRegisterUrl, data)
  }
}
