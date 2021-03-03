import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { IPrescriptionRequest, PatientPrescription } from '@shared/models/prescriptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = `${environment.apiBaseURL}/gp-patientPrescription`;
  }

  create(prescription: PatientPrescription): Observable<IResponseWrapper<any>> {
    return this.httpClient.post<IResponseWrapper<any>>(this.baseURL, prescription);
  }

  delete(patientEmail: string, prescriptionID: number): Observable<IResponseWrapper<any>> {
    const params = new HttpParams({
      fromObject: {
        patientEmail,
        prescriptionID: prescriptionID?.toString()
      }
    });
    
    return this.httpClient.delete<IResponseWrapper<any>>(this.baseURL, { params });  
  }

  getPrescriptionRequests(): Observable<IResponseWrapper<IPrescriptionRequest[]>> {
    return this.httpClient.get<IResponseWrapper<IPrescriptionRequest[]>>(`${this.baseURL}/gp-requests`);
  }

  createPrescriptionRequest(prescriptionRequest: IPrescriptionRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/gp-PatientPrescriptions`, prescriptionRequest);
  }

  endPrescription(patientEmail: string, prescriptionID: number): Observable<any> {
    return this.httpClient.put<any>(`${this.baseURL}/gp-PatientPrescriptions`, {
      patientEmail,
      prescriptionID
    });
  }
}
