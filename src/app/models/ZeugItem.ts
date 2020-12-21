import { AppwriteObject } from './AppwriteObject';
import { ZeugType } from './ZeugType';
import { ZeugStorage } from './ZeugStorage';

export class ZeugItem extends AppwriteObject {
  title: string;
  type: ZeugType;
  isPrimary: boolean;
  description: string;
  firstDayOfUse: number;
  manufacturer: string;
  model: string;
  storage: ZeugStorage;
  isAttachedTo: ZeugItem;
  children: ZeugItem[];

  asOrdinaryObject() {
    let obj = { ...this };
    delete obj.$collection;
    delete obj.$id;
    delete obj.$permissions;
    delete obj.children;
    return obj;
  }
}
