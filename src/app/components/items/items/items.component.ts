import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ItemsService } from 'src/app/services/items.service';
import { UserService } from 'src/app/services/user.service';
import { CombinedItem } from 'src/app/models/CombinedItem';
import { User } from 'src/app/models/User';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { ZeugType } from 'src/app/models/ZeugType';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  currentUser: User;
  types: ZeugType[] = [];
  storages: ZeugStorage[] = [];
  items: ZeugItem[] = [];
  combinedItems: CombinedItem[] = [];

  constructor(
    private userService: UserService,
    private typesService: TypesService,
    private storagesService: StoragesService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
      this.combineItems();
    });
    this.types = this.typesService.types;
    this.typesService.typesChanged.subscribe((response) => {
      this.types = response;
      this.combineItems();
    });
    this.storages = this.storagesService.storages;
    this.storagesService.storagesChanged.subscribe((response) => {
      this.storages = response;
      this.combineItems();
    });
    this.items = this.itemsService.items;
    this.itemsService.itemsChanged.subscribe((response) => {
      this.items = response;
      this.combineItems();
    });
    this.combineItems();
  }

  combineItems(): void {
    if (
      this.currentUser &&
      this.items.length &&
      this.storages.length &&
      this.types.length
    ) {
      this.combinedItems = [];

      let findChildren = (item: CombinedItem) => {
        this.items.map((child) => {
          if (child.isAttachedTo && child.isAttachedTo.$id === item.$id) {
            let combinedChild = CombinedItem.fromZeugItem(child);
            findChildren(combinedChild);
            item.children.push(combinedChild);
          }
        });
      };

      // first get all items to display on dashboard
      this.items.forEach((item) => {
        if (item.showOnDashboard && !item.storage) {
          let combinedItem = CombinedItem.fromZeugItem(item);
          // recursively find all children
          findChildren(combinedItem);
          this.combinedItems.push(combinedItem);
        }
      });
    }
  }
}
