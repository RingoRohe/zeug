import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugItem } from '../models/ZeugItem';
import { ZeugStorage } from '../models/ZeugStorage';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: ZeugItem[] = [];
  itemsChanged: Subject<ZeugItem[]> = new Subject<ZeugItem[]>();

  constructor(
    private api: ApiService,
    private userService: UserService
  ) {
    this.userService.userHasChanged.subscribe(response => {
      this.getItems();
    });

    if (this.userService.currentUser) {
      this.getItems();
    }
  }

  get all() {
    return this.items;
  }

  updateSubscribers() {
    this.itemsChanged.next(this.items);
  }

  getItems() {
    let promise = this.api.listDocuments(this.api.collectionId('items'));

    promise.then((response) => {
      this.items = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.items.push(
          ZeugItem.fromAppwriteDocument(new ZeugItem(), document)
        );
      });
      this.updateSubscribers();
    });
  }

  getItem(documentId: string) {
    let promise = this.api.getDocument(this.api.collectionId('items'), documentId);

    return promise;
  }

  createItem(item: ZeugItem): Promise<Object> {
    let promise = this.api.createDocument(
      this.api.collectionId('items'),
      item.asOrdinaryObject()
    );

    promise.then(response => {
      this.items.push(ZeugItem.fromAppwriteDocument(new ZeugItem, response));
      this.updateSubscribers();
    }, error => {
      console.error('Item not saved', error);
    });

    return promise;
  }

  updateItem(item: ZeugItem) {
    let promise = this.api.updateDocument(
      this.api.collectionId('items'),
      item.$id,
      item.asOrdinaryObject()
    );

    promise.then(
      (response) => {
        this.getItems();
      },
      (error) => {
        console.error('Item not updated', error);
      }
    );

    return promise;
  }

  deleteItem(item: ZeugItem): Promise<Object> {
    let promise = this.api.removeDocument(item);

    promise.then(
      response => {
        this.getItems();
      },
      (error) => {
        console.error('Item not deleted', error);
      }
    );

    return promise;
  }

  moveToStorage(item: ZeugItem, storage: ZeugStorage): Promise<Object> {
    item.storage = storage;
    item.isAttachedTo = null;

    let promise = this.updateItem(item);

    return promise;
  }

}
