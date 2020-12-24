import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import * as Appwrite from 'appwrite';
import { ZeugItem } from '../models/ZeugItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  collections = {
    items: '5fdb8f66670c3',
    types: '5fde58876b842',
    storages: '5fde59d27d3cb'
    }
  appwrite: Appwrite

  constructor(private user: UserService) {
    this.appwrite = new Appwrite();
    this.appwrite
      .setEndpoint(environment.API_ENDPOINT)
      .setProject(environment.API_PROJECT_ID);
  }

  createDocument(collection: string, item: Object) {
    let promise = this.appwrite.database.createDocument(
      collection,
      item,
      [`user:${this.user.currentUser.$id}`],
      [`user:${this.user.currentUser.$id}`]
    );

    return promise;
  }

  listDocuments(collection: string) {
    let promise = this.appwrite.database.listDocuments(collection);

    return promise;
  }

  getDocument() {
    let promise = this.appwrite.database.getDocument(this.collections.items, '[DOCUMENT_ID]');

    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });
  }
}
