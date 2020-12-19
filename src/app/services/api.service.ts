import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import * as Appwrite from "appwrite";

const collections = {
  items: '5fdb8f66670c3',
  types: '5fde58876b842',
  storages: '5fde59d27d3cb'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appwrite: Appwrite

  constructor(private user: UserService) {
    this.appwrite = new Appwrite();
    this.appwrite
      .setEndpoint(environment.API_ENDPOINT)
      .setProject(environment.API_PROJECT_ID);
  }

  createItem() {
    let promise = this.appwrite.database.createDocument(
      collections.items,
      {title: 'Ringos zweites Fahrrad'},
      [`user:${this.user.currentUser.$id}`],
      [`user:${this.user.currentUser.$id}`],
      '',
      '',
      ''
    );

    promise.then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
  }

  listItems() {
    let promise = this.appwrite.database.listDocuments(
      collections.items,
      null,
      0,
      0,
      '',
      '',
      '',
      '',
      0,
      0
    );

    return promise;
  }

  getDocument() {
    let promise = this.appwrite.database.getDocument(collections.items, '[DOCUMENT_ID]');

    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });
  }
}
