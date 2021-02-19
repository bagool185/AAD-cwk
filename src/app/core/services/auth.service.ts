import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { Observable } from 'rxjs';
import { UserTypes, IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string;

  // TODO: remove when backend is implemented
  // private logIns: IUser[] = [
  //   {
  //     email: 'test@email.com',
  //     password: 'password',
  //     type: UserTypes.Patient
  //   }
  // ];

  constructor(private httpClient: HttpClient) { 
    this.baseURL = environment.apiBaseURL;
  }

  logIn(email: string, password: string): Observable<IResponseWrapper<any>> {

    const params = new HttpParams({
      fromObject: {
        email,
        password
      }
    });

    return this.httpClient.get<IResponseWrapper<any>>(`${this.baseURL}/login`, { params });
  }

  register(user: IUser): Observable<IResponseWrapper<IUser>> {

    let endpoint = '';

    switch (user?.type) {
      
      case UserTypes.GP:
        endpoint = `${this.baseURL}/gps`;
        break;
      
      default:
        // default to patient since they have the least access
        endpoint = `${this.baseURL}/patients`;
        break;
    }

    return this.httpClient.post<IResponseWrapper<IUser>>(endpoint, user);
  }
}
