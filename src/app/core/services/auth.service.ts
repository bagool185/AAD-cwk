import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { IResponseWrapper } from '@shared/models/api';
import { Observable, Subscription } from 'rxjs';
import { UserTypes, IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string;
  private loggedInUser?: IUser;

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { 
    this.baseURL = environment.apiBaseURL;
    this.loggedInUser = undefined;
  }

  currentUser(): string {
    return this.loggedInUser?.email || '';
  }

  logIn(email: string, password: string, userType: UserTypes): Subscription {

    const params = new HttpParams({
      fromObject: {
        email,
        password
      }
    });

    return this.httpClient.get<IResponseWrapper<any>>(`${this.baseURL}/login`, { params }).subscribe(() => {
        this.loggedInUser = {
          email,
          type: userType
        };

        return true;
      },
      (err) => {
        return false;
    });
  }

  logOut() {
    delete this.loggedInUser;
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
