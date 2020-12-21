import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ZeugType } from '../models/ZeugType';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  types: ZeugType[] = [];
  typesChanged: Subject<ZeugType[]> = new Subject<ZeugType[]>();

  constructor(private api: ApiService) {
    let promise = api.listDocuments(api.collections.types);

    promise.then(response => {
      this.types = [];
      Array.from(response['documents']).forEach((document: Object) => {
        this.types.push(ZeugType.fromAppwriteDocument(new ZeugType, document));
      });
      this.updateSubscribers();
    });
  }

  get all() {
    return this.types;
  }

  updateSubscribers() {
    this.typesChanged.next(this.types);
  }

  createType(type: ZeugType) {
    let promise = this.api.createDocument(this.api.collections.types ,type);

    promise.then(response => {
      console.log(response);
    });
  }

}
