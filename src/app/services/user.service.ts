import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import * as Appwrite from "appwrite";
import MD5 from 'crypto-js/md5';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appwrite: Appwrite
  currentUser: User;
  userHasChanged: Subject<User> = new Subject<User>();
  avatarUrl: string = '';

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
    name: string
  ) => {
    console.log('api', 'createUser');
    const promise = this.appwrite.account.create(email, password, name);
    promise.then(
      (response) => {
        this.login(email, password)
          .then((response) => {
          this.sendVerification();
          this.getCurrentUser();
        });
      },
      (error) => {
        console.error('Error happend on createUser:', error);
      }
    );
    return promise;
  }

  sendVerification = () => {
    console.log('api', 'sendVerification');
    const promise = this.appwrite.account.createVerification('http://localhost:4200/user/verify');
    promise.then(
      (response) => {

      },
      (error) => {
        console.error('Error happend when sending Verification:', error);
      }
    );
    return promise;
  }

  updateVerification = (
    userId: string,
    secret: string
  ) => {
    console.log('api', 'updateVerification');
    const promise = this.appwrite.account.updateVerification(userId, secret);
    promise.then(
      (response) => {
        this.getCurrentUser();
      },
      (error) => {
        console.error('Error happend on Verification Update:', error);
      }
    );
    return promise;
  }

  delete = () => {
    console.log('api', 'delete Account (block)');
    const promise = this.appwrite.account.delete();

    promise.then((response) => {
      console.log(response); // Success
      this.currentUser = null;
      this.updateSubscribers();
    }, (error) => {
      console.log('Error happened when deleting Account: ', error); // Failure
    });

    return promise;
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
      }, (error) => {
        console.error(error);
      }
    );
    return promise;
  }

  logout = (
    sessionId: string = 'current'
  ) => {
    console.log('api', 'logout');
    const promise = this.appwrite.account.deleteSession(sessionId);
    promise.then(
      () => {
        this.currentUser = null;
        this.updateSubscribers();
      },
      (error) => {
        console.error('Error happend on logout:', error);
      }
    );
    return promise;
  }

  getCurrentUser = () => {
    console.log('api', 'getCurrentUser');
    let promise = this.appwrite.account.get();
    promise.then(
      (response: User) => {
        this.currentUser = response;
        this.getAvatar();
        this.updateSubscribers();
      },
      (error) => {
        console.warn('Can\'t get User. User not logged in.')
      }
    );
    return promise;
  }

  getAvatar = () => {
    // let initials = this.appwrite.avatars.getInitials();
    const hash = MD5(this.currentUser.email.trim().toLowerCase());
    const url = 'https://www.gravatar.com/avatar/' + hash + '?s=80&d=mp';
    // console.log(this.currentUser.email, hash, url, initials);
    this.avatarUrl = url;
  }
}
