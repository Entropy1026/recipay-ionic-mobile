import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData = new BehaviorSubject<User>(null);
  getUser = this.userData.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userData.next(user);
  }
}
