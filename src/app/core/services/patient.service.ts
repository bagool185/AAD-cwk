import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IPatientPrescriptions } from '@shared/models/prescriptions';
import { Patient } from '@shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "";

  constructor(private readonly httpClient: HttpClient) {
    this.baseURL = environment.apiBaseURL;
  }


  get(email: string): Observable<Patient> {
    
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<Patient>(`${this.baseURL}/patient`, { params });
  }
  
  getAll(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.baseURL}/patients`);
  }

  getPatientPrescription(patientEmail: string): Observable<IPatientPrescriptions> {
    
    const params = new HttpParams({
      fromObject: {
        email: patientEmail
      }
    });

    return this.httpClient.get<IPatientPrescriptions>(`${this.baseURL}/patient-prescriptions`, { params });
  }

  getPatientAppointments(patientEmail: string): Observable<object> {
    
    const params = new HttpParams({
      fromObject: {
        email: patientEmail
      }
    });

    return this.httpClient.get(`${this.baseURL}/patient-appointments`, { params });
  }

  delete(email: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete(`${this.baseURL}/patient`, {params});
  }
}
