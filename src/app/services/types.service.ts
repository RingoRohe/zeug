import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugType } from '../models/ZeugType';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  types: ZeugType[] = [];
  typesChanged: Subject<ZeugType[]> = new Subject<ZeugType[]>();

  constructor(
    private api: ApiService,
    private userService: UserService
  ) {
    this.userService.userHasChanged.subscribe(response => {
      this.getTypes();
    });

    if (userService.currentUser) {
      this.getTypes();
    }
  }

  get all() {
    return this.types;
  }

  updateSubscribers() {
    this.typesChanged.next(this.types);
  }

  getTypes() {
    let promise = this.api.listDocuments(this.api.collectionId('types'));

    promise.then(response => {
      this.types = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.types.push(ZeugType.fromAppwriteDocument(new ZeugType, document));
      });
      this.updateSubscribers();
    });
  }

  createType(type: ZeugType) {
    let promise = this.api.createDocument(this.api.collectionId('types') ,type);

    promise.then(response => {
      console.log(response);
    });
  }

}
