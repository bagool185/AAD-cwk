import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPatientPrescriptions } from '@shared/models/prescriptions';
import { IUser, Patient } from '@shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "";

  constructor(private readonly httpClient: HttpClient) {
    this.baseURL = environment.apiBaseURL;
  }


  get(email: string): Observable<IResponseWrapper<Patient>> {
    
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.get<IResponseWrapper<Patient>>(`${this.baseURL}/patient`, { params });
  }
  
  create(user: IUser): Observable<IResponseWrapper<IUser>> {
    return this.httpClient.post<IResponseWrapper<IUser>>(`${this.baseURL}/patients`, user);
  }

  getAll(): Observable<IResponseWrapper<Patient[]>> {
    return this.httpClient.get<IResponseWrapper<Patient[]>>(`${this.baseURL}/patients`);
  }

  getPatientPrescription(patientEmail: string): Observable<IResponseWrapper<IPatientPrescriptions>> {
    
    const params = new HttpParams({
      fromObject: {
        email: patientEmail
      }
    });

    return this.httpClient.get<IResponseWrapper<IPatientPrescriptions>>(`${this.baseURL}/patient-prescriptions`, { params });
  }

  getPatientAppointments(patientEmail: string): Observable<IResponseWrapper<object>> {
    
    const params = new HttpParams({
      fromObject: {
        email: patientEmail
      }
    });

    return this.httpClient.get<IResponseWrapper<object>>(`${this.baseURL}/patient-appointments`, { params });
  }

  delete(email: string): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        email
      }
    });

    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/patient`, {params});
  }
}
