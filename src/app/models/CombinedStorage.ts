import { ZeugStorage } from './ZeugStorage';

export class CombinedStorage extends ZeugStorage {
  items: ZeugStorage[] = [];

  static fromZeugStorage(object: ZeugStorage): CombinedStorage {
    let combinedStorage = new CombinedStorage();
    Object.assign(combinedStorage, object);
    return combinedStorage;
  }

  asZeugStorage(): ZeugStorage {
    let obj = { ...this };
    delete obj.items;
    return ZeugStorage.fromObject(obj);
  }
}
