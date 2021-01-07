import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import Appwrite from 'appwrite';
import * as collectionsData from '../../assets/collections.json';
import { AppwriteObject } from '../models/AppwriteObject';

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
    let collection = collectionsData['default'].find(
      (item) => item.name === name
    );
    return collection.id;
  }

  listDocuments(
    collectionId: string,
    filters: string[] = [],
    offset: number = 0,
    limit: number = 1000,
    orderField: string = null,
    orderType: string = 'DESC'
  ): Promise<Object> {
    let promise = this.appwrite.database.listDocuments(
      collectionId,
      filters,
      offset,
      limit,
      orderField,
      orderType
    );

    return promise;
  }

  getDocument(collectionId: string, documentId: string): Promise<Object> {
    let promise = this.appwrite.database.getDocument(collectionId, documentId);

    return promise;
  }

  createDocument(collectionId: string, item: Object): Promise<Object> {
    let promise = this.appwrite.database.createDocument(
      collectionId,
      item,
      [`user:${this.user.currentUser.$id}`],
      [`user:${this.user.currentUser.$id}`]
    );

    return promise;
  }

  updateDocument(
    collectionId: string,
    documentId: string,
    object: Object
  ): Promise<Object> {
    let promise = this.appwrite.database.updateDocument(
      collectionId,
      documentId,
      object,
      [`user:${this.user.currentUser.$id}`],
      [`user:${this.user.currentUser.$id}`]
    );

    return promise;
  }

  removeDocument(document: AppwriteObject): Promise<Object> {
    let promise = this.appwrite.database.deleteDocument(
      document.$collection,
      document.$id
    );

    promise.then(
      (response) => {
        console.log(response); // Success
      },
      (error) => {
        console.log(error); // Failure
      }
    );

    return promise;
  }
}
