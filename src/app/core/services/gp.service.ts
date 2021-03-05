import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { GP } from '@shared/models/user';
import { Observable } from 'rxjs';

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

  get(email: string): Observable<IResponseWrapper<GP>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<IResponseWrapper<GP>>(`${this.baseURL}/gp`, { params });
  }

  delete(email: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete(`${this.baseURL}/gps`, {params});
  }

  getPatients(gpEmail: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email: gpEmail
      }
    });

    return this.httpClient.get(`${this.baseURL}/gp-patients`, { params });
  }

  assignPatientToGP(patientEmail: string, gpEmail: string): Observable<any> {

    const requestBody = {
      'GPEmail': gpEmail,
      patientEmail
    };

    return this.httpClient.post(`${this.baseURL}/gp-assignPatient`, requestBody);
  }

  dissociatePatientFromGP(patientEmail: string, gpEmail: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        'GPEmail': gpEmail,
        patientEmail
      }
    });

    return this.httpClient.delete(`${this.baseURL}/gp-assignPatient`,  { params  });
  } 
}
