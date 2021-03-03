import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPrescriptionRequest } from '@shared/models/prescriptions';
import { GP, IUser } from '@shared/models/user';
import { InteropObservable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GpService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) {
    this.baseURL = environment.apiBaseURL;
  }

  getAll(): Observable<IResponseWrapper<GP[]>> {
    return this.httpClient.get<IResponseWrapper<GP[]>>(`${this.baseURL}/gps`);
  }

  create(user: IUser): Observable<IResponseWrapper<any>> {
    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gps`, user);
  }

  get(email: string): Observable<IResponseWrapper<GP>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<IResponseWrapper<GP>>(`${this.baseURL}/gp`, { params });
  }

  delete(email: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/gps`, {params});
  }

  getPatients(gpEmail: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        email: gpEmail
      }
    });

    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gp-patients`, { params });
  }

  assignPatientToGP(patientEmail: string, gpEmail: string): Observable<IResponseWrapper<any>> {
    const requestBody ={
        gpEmail,
        patientEmail
    };

    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gps-assignPatient`, requestBody);
  }

  dissociatePatientFromGP(patientEmail: string, gpEmail: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        gpEmail,
        patientEmail
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/gps-assignPatient`, { params });
  } 
}
