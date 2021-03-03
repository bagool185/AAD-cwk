import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = environment.apiBaseURL;
  }

  createResults(patientEmail: string, bloodData: string[]): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/gp-patientBloods`, { patientEmail, bloodData });
  } 

  scheduleTests(patientEmail: string, date: string): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/gp-scheduleBloods`, { patientEmail, date });
  }

  removeTests(patientEmail: string, date: string): Observable<any> {
    
    const params = new HttpParams({
      fromObject: {
        patientEmail,
        date
      }
    });
    
    return this.httpClient.delete<any>(`${this.baseURL}/gp-scheduleBloods`, { params });
  }
}
