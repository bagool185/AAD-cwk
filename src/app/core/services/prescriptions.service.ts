import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPrescriptionRequest, IPrescriptions, PatientPrescription } from '@shared/models/prescriptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = `${environment.apiBaseURL}/gp-PatientPrescriptions`;
  }

  create(prescription: PatientPrescription): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, prescription);
  }

  delete(patientEmail: string, prescriptionID: number): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        patientEmail,
        prescriptionID: prescriptionID?.toString()
      }
    });
    
    return this.httpClient.delete<any>(this.baseURL, { params });  
  }

  getPrescriptionRequests(gpEmail: string): Observable<IResponseWrapper<IPrescriptions>> {

    const params = new HttpParams({
      fromObject: {
        email: gpEmail
      }
    });

    return this.httpClient.get<IResponseWrapper<IPrescriptions>>(`${environment.apiBaseURL}/gp-requests`, { params });
  }

  createPrescriptionRequest(prescriptionRequest: IPrescriptionRequest): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, prescriptionRequest);
  }

  endPrescription(patientEmail: string, prescriptionID: number): Observable<any> {
    return this.httpClient.put<any>(this.baseURL, {
      patientEmail,
      prescriptionID
    });
  }
}
