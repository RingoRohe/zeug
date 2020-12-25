import { ZeugItem } from './ZeugItem';

export class CombinedItem extends ZeugItem {
  children: ZeugItem[] = [];

  static fromZeugItem(object: ZeugItem): CombinedItem {
    let combinedItem = new CombinedItem();
    Object.assign(combinedItem, object);
    return combinedItem;
  };
}