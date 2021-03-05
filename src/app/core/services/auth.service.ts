import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { Observable } from 'rxjs';
import { UserTypes, IUser } from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string;

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { 
    this.baseURL = environment.apiBaseURL;
  }

  currentUser(): string {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail || '';
  }

  currentUserType(): UserTypes {
    const userType = localStorage.getItem('userType');

    return userType as UserTypes;
  }

  setCurrentUser(user: IUser) {
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userType', user.type);
  }

  logIn(email: string, password: string, userType: UserTypes): Observable<any> {

    const params = new HttpParams({
      fromObject: {
        email,
        password
      }
    });

    return this.httpClient.get(`${this.baseURL}/login`, { params });
  }

  logOut() {
    localStorage.removeItem('userEmail');
  }
 
  register(user: IUser): Observable<IResponseWrapper<IUser>> {

    let endpoint = '';

    switch (user?.type) {
      
      case UserTypes.GP:
        endpoint = `${this.baseURL}/gps`;
        break;
      
      case UserTypes.Pharmacist:
        endpoint = `${this.baseURL}/pharmacists`;
        break;
      
      case UserTypes.Technician:
        endpoint = `${this.baseURL}/technicians`;
        break;
      
      default:
        // default to patient since they have the least access
        endpoint = `${this.baseURL}/patients`;
        break;
    }

    return this.httpClient.post<IResponseWrapper<IUser>>(endpoint, user);
  }
}
