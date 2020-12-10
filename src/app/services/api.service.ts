import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Appwrite from "appwrite";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  appwrite: Appwrite

  constructor() {
    this.appwrite = new Appwrite();
    this.appwrite
      .setEndpoint(environment.API_ENDPOINT)
      .setProject(environment.API_PROJECT_ID);
  }
}
