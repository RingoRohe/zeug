import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugItem } from '../models/ZeugItem';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: ZeugItem[] = [];
  itemsChanged: Subject<ZeugItem[]> = new Subject<ZeugItem[]>();

  constructor(private api: ApiService) {
    let promise = api.listDocuments(api.collections.items);

    promise.then(response => {
      this.items = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.items.push(ZeugItem.fromAppwriteDocument(new ZeugItem, document));
      });
      this.updateSubscribers();
    });
  }

  get all() {
    return this.items;
  }

  updateSubscribers() {
    this.itemsChanged.next(this.items);
  }

  createItem(item: ZeugItem) {
    let promise = this.api.createDocument(this.api.collections.items, item.asOrdinaryObject());

    promise.then(response => {
      this.items.push(ZeugItem.fromAppwriteDocument(new ZeugItem, response));
    }, error => {
      console.error('Item not saved', error);
    });
  }

}
