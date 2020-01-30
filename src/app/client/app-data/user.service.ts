import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  password = new BehaviorSubject<string>(null);
  getPassword = this.password.asObservable();

  userData = new BehaviorSubject<User>(null);
  getUser = this.userData.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userData.next(user);
  }

  setPassword(pass: string) {
    this.password.next(pass);
  }
}
