import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User;
  userHasChanged: Subject<User> = new Subject<User>();

  constructor(private api: ApiService) { }

  updateSubscribers = () => {
    this.userHasChanged.next(this.currentUser);
  }

  createUser = (email:string, password:string, name: string) => {
    this.api.createUser(email, password, name, (response) => {
      this.api.login(email, password, (response) => {
        this.api.sendVerification();
        this.getCurrentUser();
      });
    });
  }

  sendVerification = () => {
    this.api.sendVerification();
  }

  updateVerification = (userId: string, secret: string) => {
    this.api.updateVerification(userId, secret, (success) => {
      this.getCurrentUser();
    });
  }

  login = (email: string, password: string) => {
    this.api.login(email, password, () => {
      this.getCurrentUser();
    });
  }

  logout = (sessionId: string = 'current') => {
    this.api.logout(sessionId, (success) => {
      this.currentUser = null;
      this.updateSubscribers();
    });
  }

  getCurrentUser = () => {
    this.api.getCurrentUser((response) => {
      this.currentUser = response;
      this.updateSubscribers();
    });
  }
}
