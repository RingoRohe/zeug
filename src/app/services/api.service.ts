import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import Appwrite from 'appwrite';
import * as collectionsData from '../../assets/collections.json';

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

  collectionId(name: string): string {
    let collection = collectionsData['default'].find(item => item.name === name);
    return collection.id;
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
      this.collectionId('items'),
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
