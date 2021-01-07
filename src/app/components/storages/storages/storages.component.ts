import { Component, OnInit } from '@angular/core';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { CombinedStorage } from 'src/app/models/CombinedStorage';
import { ItemsService } from 'src/app/services/items.service';
import { StoragesService } from 'src/app/services/storages.service';
import { NgPopupsService } from 'ng-popups';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent implements OnInit {
  items: ZeugItem[] = [];
  storages: ZeugStorage[] = [];
  combinedStorages: CombinedStorage[] = [];

  constructor(
    private itemsService: ItemsService,
    private storagesService: StoragesService,
    private modalService: NgxSmartModalService,
    private toast: ToastrService,
    private popups: NgPopupsService
  ) {}

  ngOnInit(): void {
    this.items = this.itemsService.items;
    this.itemsService.itemsChanged.subscribe((response) => {
      this.items = response;
      this.combineStorages();
    });
    this.storages = this.storagesService.storages;
    this.storagesService.storagesChanged.subscribe((response) => {
      this.storages = response;
      this.combineStorages();
    });
    this.combineStorages();
  }

  combineStorages() {
    this.combinedStorages = [];
    if (this.items.length && this.storages.length) {
      this.storages.forEach((storage) => {
        let combinedStorage = CombinedStorage.fromZeugStorage(storage);
        combinedStorage.items = this.items.filter((item) => {
          if (!item.storage) {
            return false;
          }
          if (item.storage.$id === storage.$id) {
            return item;
          }
        });
        this.combinedStorages.push(combinedStorage);
      });
    }
  }

  onCreateButtonClicked = () => {
    this.toast.info('create clicked');
  };

  onDeleteButtonClicked = () => {
    this.toast.info('delete clicked');
  };

  onEditButtonClicked = () => {
    this.toast.info('edit clicked');
  };
}
