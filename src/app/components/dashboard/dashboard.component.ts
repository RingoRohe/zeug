import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ItemsService } from 'src/app/services/items.service';

import { ZeugItem } from '../../models/ZeugItem';
import { ZeugType } from 'src/app/models/ZeugType';
import { ZeugStorage } from 'src/app/models/ZeugStorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  types: ZeugType[] = [];
  storages: ZeugStorage[] = [];
  items: ZeugItem[] = [];

  constructor(
    private typesService: TypesService,
    private storagesService: StoragesService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.typesService.typesChanged.subscribe(response => {
      this.types = response;
    });
    this.storagesService.storagesChanged.subscribe(response => {
      this.storages = response;
    });
    this.itemsService.itemsChanged.subscribe(response => {
      this.items = response;
    });
  }

  onCreateButtonClicked() {
    let item = new ZeugItem();
    item.title = "Trek Crossrip Comp";
    item.manufacturer = "Trek";
    item.model = "Crossrip Comp";
    item.type = this.types[0];
    item.isPrimary = true;
    this.itemsService.createItem(item);
  }

}
