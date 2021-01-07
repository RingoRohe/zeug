import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugStorage } from '../models/ZeugStorage';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class StoragesService {
  storages: ZeugStorage[] = [];
  storagesChanged: Subject<ZeugStorage[]> = new Subject<ZeugStorage[]>();

  constructor(private api: ApiService, private userService: UserService) {
    userService.userHasChanged.subscribe((response) => {
      this.getStorages();
    });

    if (userService.currentUser) {
      this.getStorages();
    }
  }

  get all() {
    return this.storages;
  }

  updateSubscribers() {
    this.storagesChanged.next(this.storages);
  }

  getStorages() {
    let promise = this.api.listDocuments(this.api.collectionId('storages'));

    promise.then((response) => {
      this.storages = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.storages.push(
          ZeugStorage.fromAppwriteDocument(new ZeugStorage(), document)
        );
      });
      this.updateSubscribers();
    });
  }

  createStorage(item: ZeugStorage): Promise<Object> {
    let promise = this.api.createDocument(
      this.api.collectionId('storages'),
      item
    );

    promise.then(
      (response) => {
        this.storages.push(
          ZeugStorage.fromAppwriteDocument(new ZeugStorage(), response)
        );
        this.updateSubscribers();
      },
      (error) => {
        console.error('Storage not saved', error);
      }
    );

    return promise;
  }

  /**
   *
   * @param storage Storage to delete
   */
  deleteStorage(storage: ZeugStorage): Promise<Object> {
    let promise = this.api.removeDocument(storage);

    promise.then(
      (response) => {
        this.getStorages();
      },
      (error) => {
        console.error('Storage not deleted', error);
      }
    );

    return promise;
  }
}
