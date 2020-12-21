import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ItemsService } from 'src/app/services/items.service';

import { ZeugItem } from '../../models/ZeugItem';
import { ZeugType } from 'src/app/models/ZeugType';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  types: ZeugType[] = [];
  storages: ZeugStorage[] = [];
  primaryItems: ZeugItem[] = [];
  secondaryItems: ZeugItem[] = [];

  constructor(
    private userService: UserService,
    private typesService: TypesService,
    private storagesService: StoragesService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
    this.types = this.typesService.types;
    this.typesService.typesChanged.subscribe(response => {
      this.types = response;
    });
    this.storages = this.storagesService.storages;
    this.storagesService.storagesChanged.subscribe(response => {
      this.storages = response;
    });
    this.primaryItems = this.itemsService.items;
    this.itemsService.itemsChanged.subscribe(response => {
      this.primaryItems = [];
      this.sortItems(response);
    });
  }

  sortItems(items: ZeugItem[]): void {
    items.forEach(item => {
      if (item.isPrimary) {
        this.primaryItems.push(item);
      } else {
        this.secondaryItems.push(item);
      }
    });
  }

  onCreateButtonClicked() {
    let item = new ZeugItem();
    item.title = "Schnürsenkel (blau)";
    item.manufacturer = "Schlaufe & Co KG";
    item.type = this.types[1];
    item.isPrimary = false;
    item.isAttachedTo = this.primaryItems[3];
    this.itemsService.createItem(item);
  }

}
