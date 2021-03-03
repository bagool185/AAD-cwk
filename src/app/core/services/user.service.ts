import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient) { 
    this.baseURL = environment.apiBaseURL;
  }
  
}
