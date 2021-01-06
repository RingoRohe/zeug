import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CombinedItem } from '../models/CombinedItem';
import { ZeugItem } from '../models/ZeugItem';
import { ZeugStorage } from '../models/ZeugStorage';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items: ZeugItem[] = [];
  itemsChanged: Subject<ZeugItem[]> = new Subject<ZeugItem[]>();

  constructor(private api: ApiService, private userService: UserService) {
    this.userService.userHasChanged.subscribe((response) => {
      this.getItems();
    });

    if (this.userService.currentUser) {
      this.getItems();
    }
  }

  /**
   * Getter for all loaded Items (will not load more Items from Database)
   */
  get all() {
    return this.items;
  }

  /**
   * notificates all Subscripers about Changes
   */
  updateSubscribers() {
    this.itemsChanged.next(this.items);
  }

  /**
   * Get all last 50 Items
   */
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

  /**
   *
   * @param documentId ID of Item to be found
   */
  getItem(documentId: string) {
    let promise = this.api.getDocument(
      this.api.collectionId('items'),
      documentId
    );

    return promise;
  }

  /**
   *
   * @param item The Item to be created in Database
   */
  createItem(item: ZeugItem): Promise<Object> {
    let promise = this.api.createDocument(
      this.api.collectionId('items'),
      item.asOrdinaryObject()
    );

    promise.then(
      (response) => {
        this.items.push(
          ZeugItem.fromAppwriteDocument(new ZeugItem(), response)
        );
        this.updateSubscribers();
      },
      (error) => {
        console.error('Item not saved', error);
      }
    );

    return promise;
  }

  /**
   *
   * @param item Item to update
   */
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

  /**
   *
   * @param item Item to delete
   */
  deleteItem(item: ZeugItem): Promise<Object> {
    let promise = this.api.removeDocument(item);

    promise.then(
      (response) => {
        this.getItems();
      },
      (error) => {
        console.error('Item not deleted', error);
      }
    );

    return promise;
  }
  /**
   * Moves Item to Storage
   * @param item The Item to be moved
   * @param storage The Storage the Item should be moved to
   */
  moveToStorage(item: ZeugItem, storage: ZeugStorage): Promise<Object> {
    item.storage = storage;
    item.isAttachedTo = null;

    let promise = this.updateItem(item);

    return promise;
  }

  /**
   * Takes an Array of ZeugItems and returns an Array of CombinedItems which includes Subitems (Children) that are linked via isAttachedTo Attribute
   *
   * @param items Array of ZeugItems
   * @returns CombinedItem[]
   */
  combineItems(items: ZeugItem[]): CombinedItem[] {
    if (items.length) {
      let combinedItems: CombinedItem[] = [];

      items.forEach((item) => {
        let combinedItem = CombinedItem.fromZeugItem(item);
        this.findChildren(combinedItem, items);
        combinedItems.push(combinedItem);
      });

      return combinedItems;
    }
  }

  /**
   * Takes an ZeugItem and returns CombinedItem which includes Subitems (Children) that are linked via isAttachedTo Attribute
   *
   * @param item the ZeugItem to what Children should be found
   * @param items Array of ZeugItems
   * @returns CombinedItem[]
   */
  combineItem(item: ZeugItem, items: ZeugItem[]): CombinedItem {
    if (items.length) {
      let combinedItem = CombinedItem.fromZeugItem(item);
      this.findChildren(combinedItem, items);
      return combinedItem;
    }
  }

  private findChildren = (item: CombinedItem, items: ZeugItem[]) => {
    items.map((child) => {
      if (child.isAttachedTo && child.isAttachedTo.$id === item.$id) {
        let combinedChild = CombinedItem.fromZeugItem(child);
        this.findChildren(combinedChild, items);
        item.children.push(combinedChild);
      }
    });
  };
}
