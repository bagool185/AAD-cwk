import { Injectable } from '@angular/core';
import { UserTypes, IUser } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO: remove when backend is implemented
  private logIns: IUser[] = [
    {
      email: 'test@email.com',
      password: 'password',
      type: UserTypes.Patient
    }
  ];

  constructor() { }

  logIn(email: string, password: string): IUser | undefined {

    const userData = this.logIns.find(u => u.email === email);

    if (userData?.password === password) {
      return userData;
    }

    return undefined;
  }
}
