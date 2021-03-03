import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { PatientPrescription } from '@shared/models/prescriptions';
import { GP } from '@shared/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = environment.apiBaseURL;
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

  addPrescription(prescription: PatientPrescription): Observable<IResponseWrapper<any>> {
    
    return this.httpClient.post<IResponseWrapper<any>>(`${this.baseURL}/gp-patientPrescription`, prescription);
  }

  deletePrescription(patientEmail: string, prescriptionID: number): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        patientEmail,
        prescriptionID: prescriptionID?.toString()
      }
    });
    
    return this.httpClient.delete<IResponseWrapper<any>>(`${this.baseURL}/gp-patientPrescription`, { params });  
  }
}
