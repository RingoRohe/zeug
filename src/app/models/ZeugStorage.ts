import { AppwriteObject } from './AppwriteObject';

export class ZeugStorage extends AppwriteObject {
  title: string;
  description: string;

  static fromObject(object: Object): ZeugStorage {
    let zeugObject: ZeugStorage = new ZeugStorage();
    Object.assign(zeugObject, object);

    return zeugObject;
  }
}
