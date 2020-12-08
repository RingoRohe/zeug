import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Appwrite from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appwrite: Appwrite

  constructor() {
    this.appwrite = new Appwrite();
    this.appwrite
      .setEndpoint(environment.API_ENDPOINT)
      .setProject(environment.API_PROJECT_ID);
  }

  createUser = (
    email: string,
    password: string,
    name: string,
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'createUser');
    this.appwrite
    .account.create(email, password, name)
      .then(function (response) {
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(response);
        }
      }, function (error) {
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      });
  }

  sendVerification = (
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'sendVerification');
    let promise = this.appwrite.account.createVerification('http://localhost:4200/user/verify');

    promise
      .then(
        function (response) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
        },
        function (error) {
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
    let promise = this.appwrite.account.updateVerification(userId, secret);

    promise.then(
      function (response) {
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(response);
        }
      },
      function (error) {
        if (onError && typeof onError === 'function') {
          onError(error);
        }
      }
    );
  }

  login = (
    email: string,
    password: string,
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'login');
    let promise = this.appwrite.account.createSession(email, password);

    promise
      .then(
        function (response) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
        },
        function (error) {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }

  logout = (
    sessionId: string = 'current',
    onSuccess: Function = null,
    onError: Function = null
  ) => {
    console.log('api', 'logout');
    let promise = this.appwrite.account.deleteSession(sessionId);

    promise
      .then(
        function (response) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
        },
        function (error) {
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
    let promise = this.appwrite.account.get();

    promise
      .then(
        function (response) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(response);
          }
        },
        function (error) {
          if (onError && typeof onError === 'function') {
            onError(error);
          }
        }
      );
  }
}
