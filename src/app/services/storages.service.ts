import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugStorage } from '../models/ZeugStorage';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StoragesService {
  storages: ZeugStorage[] = [];
  storagesChanged: Subject<ZeugStorage[]> = new Subject<ZeugStorage[]>();

  constructor(private api: ApiService) {
    let promise = api.listDocuments(api.collections.items);

    promise.then(response => {
      this.storages = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.storages.push(ZeugStorage.fromAppwriteDocument(new ZeugStorage, document));
      });
      this.updateSubscribers();
    });
  }

  get all() {
    return this.storages;
  }

  updateSubscribers() {
    this.storagesChanged.next(this.storages);
  }

  createItem(item: ZeugStorage) {
    let promise = this.api.createDocument(this.api.collections.items, item);

    promise.then(response => {
      this.storages.push(ZeugStorage.fromAppwriteDocument(new ZeugStorage, response));
    }, error => {
      console.error('Item not saved', error);
    });
  }

}
