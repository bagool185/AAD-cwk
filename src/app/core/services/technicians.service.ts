import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPickUp } from '@shared/models/medication';
import { ITechnician } from '@shared/models/technician';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) {
    this.baseURL = `${environment.apiBaseURL}/technicians`;
  }

  getAll(): Observable<IResponseWrapper<ITechnician[]>> {
    return this.httpClient.get<IResponseWrapper<ITechnician[]>>(this.baseURL);
  }

  delete(technicianEmail: string): Observable<any> {

    const params = new HttpParams({
      fromObject: {
        email: technicianEmail
      }
    });

    return this.httpClient.delete(this.baseURL, { params });
  }

  get(technicianEmail: string): Observable<ITechnician> {

    const params = new HttpParams({
      fromObject: {
        email: technicianEmail
      }
    });

    return this.httpClient.get<ITechnician>(this.baseURL, { params });
  }

  checkPickUp(technicianEmail: string, patientEmail: string, prescriptionID: string): Observable<IPickUp> {
    
    const params = new HttpParams({
      fromObject: {
        technicianEmail,
        patientEmail,
        prescriptionID
      }
    });

    return this.httpClient.get<IPickUp>(`${environment.apiBaseURL}/pickupCheck`, { params });
  }

  pickupList(technicianEmail: string): Observable<IPickUp[]> {

    const params = new HttpParams({
      fromObject: {
        email: technicianEmail
      }
    });

    return this.httpClient.get<IPickUp[]>(`${environment.apiBaseURL}/technician-pickupList`, { params });
  }
}
