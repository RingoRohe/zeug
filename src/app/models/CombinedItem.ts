import { ZeugItem } from './ZeugItem';

export class CombinedItem extends ZeugItem {
  children: ZeugItem[] = [];

  static fromZeugItem(object: ZeugItem): CombinedItem {
    let combinedItem = new CombinedItem();
    Object.assign(combinedItem, object);
    return combinedItem;
  }

  static combineItems(items: ZeugItem[], item: ZeugItem = null): CombinedItem[] {
    if ( items.length ) {
      let combinedItems: CombinedItem[] = [];

      items.forEach((item) => {
        let combinedItem = CombinedItem.fromZeugItem(item);
        CombinedItem.findChildren(combinedItem, items);
        combinedItems.push(combinedItem);
      });

      return combinedItems;
    }
  }

  static combineItem(items: ZeugItem[], item: ZeugItem = null): CombinedItem {
    if ( items.length ) {
      let combinedItem = CombinedItem.fromZeugItem(item);
      CombinedItem.findChildren(combinedItem, items);
      return combinedItem;
    }
  }

  static findChildren = (item: CombinedItem, items: ZeugItem[]) => {
    items.map((child) => {
      if (child.isAttachedTo && child.isAttachedTo.$id === item.$id) {
        let combinedChild = CombinedItem.fromZeugItem(child);
        CombinedItem.findChildren(combinedChild, items);
        item.children.push(combinedChild);
      }
    });
  };

  asZeugItem(): ZeugItem {
    let obj = { ...this };
    delete obj.children;
    return ZeugItem.fromObject(obj);
  }
}
