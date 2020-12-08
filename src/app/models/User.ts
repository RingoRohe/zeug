export class User {
  $id: string;
  email: string;
  emailVerification: boolean;
  name: string;
  registration: number;
  roles: string[];

  constructor() {

  }

  fromDatabase(object) {
    this.$id = object.$id;
  }
}
