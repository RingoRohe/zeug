import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ItemsService } from 'src/app/services/items.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

import { ZeugItem } from '../../models/ZeugItem';
import { CombinedItem } from '../../models/CombinedItem';
import { ZeugType } from 'src/app/models/ZeugType';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ItemFormComponent } from '../items/shared/item-form/item-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentUser: User;
  types: ZeugType[] = [];
  storages: ZeugStorage[] = [];
  items: ZeugItem[] = [];
  combinedItems: CombinedItem[] = [];
  modal: any;

  @ViewChild(ItemFormComponent) formComponent: ItemFormComponent;

  constructor(
    private userService: UserService,
    private typesService: TypesService,
    private storagesService: StoragesService,
    private itemsService: ItemsService,
    private modalService: NgxSmartModalService,
    private toast: ToastrService
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
  ngAfterViewInit(): void {
    this.modal = this.modalService.get('createItemFormModal');
  }

  combineItems(): void {
    if (
      this.currentUser &&
      this.items.length &&
      this.storages.length &&
      this.types.length
    ) {
      this.combinedItems = [];

      // first get all items to display on dashboard
      this.items.forEach((item) => {
        if (item.isPrimary && !item.storage) {
          this.combinedItems.push(CombinedItem.fromZeugItem(item));
        }
      });

      // then walk through all items again and find the attached ones
      this.items.forEach((item) => {
        if (item.isAttachedTo) {
          let found = this.combinedItems.find(
            (element) => element.$id === item.isAttachedTo.$id
          );
          found.children.push(item);
        }
      });
    }
  }

  onCreateButtonClicked() {
    // let item = new ZeugItem();
    // item.title = "Bombtrack Hook Ext";
    // item.manufacturer = "Bombtrack";
    // item.model = "Hook Ext"
    // item.type = this.types[0];
    // item.isPrimary = true;
    // // item.isAttachedTo = this.combinedItems[3];
    // this.itemsService.createItem(item);

    this.modal.open();
  }

  onModalCreateFormSubmit = (data) => {
    let newItem = ZeugItem.fromObject(data);
    newItem.type = this.types[0];
    console.log('new Item', newItem);
    let promise = this.itemsService.createItem(newItem);

    promise.then(
      result => {
        this.formComponent.reset();
        this.modal.close();
        this.toast.success('Item created.')
      }, error => {
        this.toast.error('Whoops. Item not saved.');
      }
    )
  };
}
