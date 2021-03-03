import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
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

  getAll(): Observable<GP[]> {
    return this.httpClient.get<GP[]>(`${this.baseURL}/gps`);
  }

  get(email: string): Observable<GP> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<GP>(`${this.baseURL}/gp`, { params });
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

    return this.httpClient.post(`${this.baseURL}/gp-patients`, { params });
  }

  assignPatientToGP(patientEmail: string, gpEmail: string): Observable<any> {
    const requestBody ={
        gpEmail,
        patientEmail
    };

    return this.httpClient.post(`${this.baseURL}/gps-assignPatient`, requestBody);
  }

  dissociatePatientFromGP(patientEmail: string, gpEmail: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        gpEmail,
        patientEmail
      }
    });

    return this.httpClient.delete(`${this.baseURL}/gps-assignPatient`, { params });
  } 
}
