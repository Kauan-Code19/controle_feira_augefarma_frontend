import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PharmacyRepresentativeResponse } from '../../../interfaces/pharmacy_representative/pharmacy-representative-response';

@Injectable({
  providedIn: 'root'
})
export class PharmacyRepresentativeService {

  private endpointUrl = `${environment.apiUrl}/pharmacy-representative`
  private endpointGetUrl = `${environment.apiUrl}/pharmacy-representative/search-by-name-or-cpf`

  constructor(private http: HttpClient) { }

  registerPharmacyRepresentative
  (
    name: string, cpf: string, cnpj: string, corporateReason: string
  ) : Observable<PharmacyRepresentativeResponse>

  {
    const data = {name, cpf, cnpj, corporateReason}

    return this.http.post<PharmacyRepresentativeResponse>(this.endpointUrl, data)
  }

  getPharmacyRepresentative(nameOrCpf: string) : Observable<PharmacyRepresentativeResponse[]> {
    const params = new HttpParams().set('nameOrCpf', nameOrCpf);

    return this.http.get<PharmacyRepresentativeResponse[]>(this.endpointGetUrl, {params})
  }

  generatePharmacyRepresentativeBadge(pharmacyRepresentativeId: number) : Observable<Blob> {
    const url = `${this.endpointUrl}/${pharmacyRepresentativeId}/badge`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
