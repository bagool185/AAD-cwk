import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPharmacist } from '@shared/models/pharmacist';
import { IPrescriptionRequest } from '@shared/models/prescriptions';
import { IUser } from '@shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacistsService {

  private pharmacistBaseURL: string;

  constructor(private readonly httpClient: HttpClient) {
    this.pharmacistBaseURL = `${environment.apiBaseURL}/pharmacists`;
  }

  getAll(): Observable<IPharmacist[]> {
    return this.httpClient.get<IPharmacist[]>(this.pharmacistBaseURL);
  }

  create(user: IUser): Observable<any> {
    return this.httpClient.post<IPharmacist[]>(this.pharmacistBaseURL, user);
  }

  delete(pharmacistEmail: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email: pharmacistEmail
      }
    });

    return this.httpClient.delete<any>(this.pharmacistBaseURL, { params });
  }

  get(pharmacistEmail: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email: pharmacistEmail
      }
    });

    return this.httpClient.get<any>(this.pharmacistBaseURL, { params });
  }

  assignTechnician(pharmacistEmail: string, technicianEmail: string): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseURL}/pharmacist-assignTechnician`, { pharmacistEmail, technicianEmail });
  }

  dissociateTechnician(pharmacistEmail: string, technicianEmail: string): Observable<any> {
    
    const params = new HttpParams({
      fromObject: {
        pharmacistEmail,
        technicianEmail
      }
    });
    
    return this.httpClient.delete(`${environment.apiBaseURL}/pharmacist-assignTechnician`, { params });
  }

  //todo
  getPrescriptionRequests(pharmacistEmail: string): Observable<any>{

    const params = new HttpParams({
      fromObject: {
        email: pharmacistEmail
      }
    });

    return this.httpClient.get(`${environment.apiBaseURL}/pharmacist-requests`, { params });
  }

  acceptPrescriptionRequest(pharmacistEmail: string, prescriptionRequestID: number): Observable<IPrescriptionRequest> {
    return this.httpClient.post<IPrescriptionRequest>(`${environment.apiBaseURL}/pharmacist-requests`,
      {
        pharmacistEmail,
        requestID: prescriptionRequestID
      });
  }

  declinePrescriptionRequest(pharmacistEmail: string, gpEmail: string, prescriptionRequestID: number): Observable<IPrescriptionRequest> {
    
    const params = new HttpParams({
      fromObject: {
        pharmacistEmail,
        'GPEmail': gpEmail,
        id: prescriptionRequestID.toString()
      }
    })
    
    return this.httpClient.delete<IPrescriptionRequest>(`${environment.apiBaseURL}/pharmacist-requests`, { params });
  }
}
