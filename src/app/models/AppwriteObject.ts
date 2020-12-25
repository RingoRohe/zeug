import { AppwritePermissions } from "./AppwritePermissions";

export class AppwriteObject {
  $collection: string;
  $id: string;
  $permissions: AppwritePermissions;

  static fromAppwriteDocument<T>(object: T, document: Object): T {
    Object.assign(object, document);
    return object;
  }

  asOrdinaryObject() {
    let obj = { ...this };
    delete obj.$collection;
    delete obj.$id;
    delete obj.$permissions;
    return obj;
  }
}
