import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import * as Appwrite from "appwrite";

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appwrite: Appwrite
  currentUser: User;
  userHasChanged: Subject<User> = new Subject<User>();

  constructor() {
    this.appwrite = new Appwrite();
    this.appwrite
      .setEndpoint(environment.API_ENDPOINT)
      .setProject(environment.API_PROJECT_ID);
  }

  updateSubscribers = () => {
    this.userHasChanged.next(this.currentUser);
  }

  createUser = (
    email: string,
    password: string,
    name: string,
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'createUser');
    this.appwrite.account.create(email, password, name)
      .then(
        (response) => {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
          this.login(email, password)
            .then((response) => {
            this.sendVerification();
            this.getCurrentUser();
          });
        },
        (error) => {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }

  sendVerification = (
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'sendVerification');
    this.appwrite.account.createVerification('http://localhost:4200/user/verify')
      .then(
        (response) => {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
        },
        (error) => {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }

  updateVerification = (
    userId: string,
    secret: string,
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'updateVerification');
    this.appwrite.account.updateVerification(userId, secret)
      .then(
      (response) => {
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(response);
        }
        this.getCurrentUser();
      },
      (error) => {
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      }
    );
  }

  login = (
    email: string,
    password: string
  ) => {
    console.log('api', 'login');
    let promise = this.appwrite.account.createSession(email, password);
    promise.then(
      () => {
        this.getCurrentUser();
      }
    );
    return promise;
  }

  logout = (
    sessionId: string = 'current',
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'logout');
    this.appwrite.account.deleteSession(sessionId)
      .then(
        (response: User) => {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
          this.currentUser = null;
          this.updateSubscribers();
        },
        (error) => {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }

  getCurrentUser = (
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'getCurrentUser');
    this.appwrite.account.get()
      .then(
        (response: User) => {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
          this.currentUser = response;
          this.updateSubscribers();
        },
        (error) => {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }
}
