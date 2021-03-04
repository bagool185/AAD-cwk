import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IPrescriptionRequest, PatientPrescription } from '@shared/models/prescriptions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = `${environment.apiBaseURL}/gp-PatientPrescription`;
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

  getPrescriptionRequests(gpEmail: string): Observable<IPrescriptionRequest[]> {

    const params = new HttpParams({
      fromObject: {
        email: gpEmail
      }
    });

    return this.httpClient.get<IPrescriptionRequest[]>(`${environment.apiBaseURL}/gp-requests`, { params });
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
