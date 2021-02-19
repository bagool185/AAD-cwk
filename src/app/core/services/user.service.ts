import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { GP, Patient, PatientPrescription } from '@shared/models/user';
import { serialize } from 'json-typescript-mapper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = environment.apiBaseURL;
  }

  getPatient(email: string): Observable<IResponseWrapper<Patient>> {
    
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<IResponseWrapper<Patient>>(`${this.baseURL}/patient`, { params });
  }

  deletePatient(email: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/patient`, {params});
  }

  getGP(email: string): Observable<IResponseWrapper<GP>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<IResponseWrapper<GP>>(`${this.baseURL}/gp`, { params });
  }

  deleteGP(email: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/gp`, {params});
  }

  assignPatientToGP(patientEmail: string, gpEmail: string): Observable<IResponseWrapper<any>> {
    const requestBody ={
        'GP-email': gpEmail,
        'patient-email': patientEmail
    };

    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gps-assignPatient`, requestBody);
  }

  dissociatePatientFromGP(patientEmail: string, gpEmail: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        'GP-email': gpEmail,
        'patient-email': patientEmail
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/gps-assignPatient`, { params });
  } 

  addPrescription(prescription: PatientPrescription): Observable<IResponseWrapper<any>> {
    const requestBody = serialize(prescription);
    
    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gp-patientPrescription`, requestBody);
  }
}
