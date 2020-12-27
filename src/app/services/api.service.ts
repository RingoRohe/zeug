import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import * as Appwrite from 'appwrite';
import { ZeugItem } from '../models/ZeugItem';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  collections = {
    items: '5fe8ebe9c06a1',
    types: '5fe8ebfb955e3',
    storages: '5fe8ec1b9a88c',
  };
  appwrite: Appwrite;

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
      [`user:${this.user.currentUser.$id}`],
      '',
      '',
      ''
    );

    return promise;
  }

  listDocuments(collection: string) {
    let promise = this.appwrite.database.listDocuments(collection);

    return promise;
  }

  getDocument(documentId: string) {
    let promise = this.appwrite.database.getDocument(
      this.collections.items,
      documentId
    );

    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }
}
