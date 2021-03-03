import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IDrug } from '@shared/models/medication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) {
    this.baseURL = `${environment.apiBaseURL}/drugs`;
  }

  getAll(): Observable<IDrug[]> {
    return this.httpClient.get<IDrug[]>(this.baseURL);
  }

  create(drug: IDrug): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, drug);
  }

  delete(drugName: string): Observable<any> {

    const params = new HttpParams({
      fromObject: {
        drugName
      }
    });

    return this.httpClient.delete<any>(this.baseURL, { params });
  }
}
