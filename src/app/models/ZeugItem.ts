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
}
