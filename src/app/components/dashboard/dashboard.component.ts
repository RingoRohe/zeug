import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';
import { StoragesService } from 'src/app/services/storages.service';
import { ItemsService } from 'src/app/services/items.service';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { NgPopupsService } from 'ng-popups';

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
  createModal: NgxSmartModalComponent;
  editModal: NgxSmartModalComponent;
  storageModal: NgxSmartModalComponent;

  @ViewChild('createForm') createFormComponent: ItemFormComponent;
  @ViewChild('editForm') editFormComponent: ItemFormComponent;
  @ViewChild('storageSelector') storageSelector: NgxSmartModalComponent;

  constructor(
    private userService: UserService,
    private typesService: TypesService,
    private storagesService: StoragesService,
    private itemsService: ItemsService,
    private modalService: NgxSmartModalService,
    private toast: ToastrService,
    private popups: NgPopupsService
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
      this.combinedItems = [];
      this.combineItems();
    });
    this.combineItems();
  }

  ngAfterViewInit(): void {
    this.createModal = this.modalService.get('createItemFormModal');
    this.editModal = this.modalService.get('editItemFormModal');
    this.storageModal = this.modalService.get('storageSelector');
  }

  combineItems(): void {
    if (
      this.currentUser &&
      this.items.length &&
      this.storages.length &&
      this.types.length
    ) {
      this.combinedItems = CombinedItem.combineItems(this.items)
        .filter(item => item.showOnDashboard && !item.storage);
    }
  }

  onDeleteButtonClicked = (item: CombinedItem) => {
    this.popups
      .confirm('Do You really want to delete ' + item.title + '?', {
        title: 'Think twice!',
        okButtonText: 'Sure!',
        cancelButtonText: 'No',
        color: '#F00',
      })
      .subscribe((res) => {
        if (res) {
          this.deleteItem(item);
        }
      });
  };

  deleteItem(item: ZeugItem) {
    let promise = this.itemsService.deleteItem(item);

    promise.then(
      (result) => {
        this.toast.success(item.title + ' deleted.');
      },
      (error) => {
        this.toast.error('Error when trying to delete ' + item.title);
      }
    );
  }

  onCreateButtonClicked() {
    this.createModal.open();
  }

  onModalCreateFormSubmit = (item: ZeugItem) => {
    let promise = this.itemsService.createItem(item);

    promise.then(
      (result) => {
        this.createModal.close();
        this.toast.success('Item created.');
      },
      (error) => {
        this.toast.error('Whoops. Item not saved.');
      }
    );
  };

  createModalCloseFinished() {
    this.createFormComponent.reset();
  }

  onEditButtonClicked = (item: CombinedItem) => {
    this.editFormComponent.update(item.asZeugItem());
    this.editModal.open();
  };

  onEditFormSubmit = (item: ZeugItem) => {
    let promise = this.itemsService.updateItem(item);
    promise.then(
      (result) => {
        this.editModal.close();
        this.toast.success('Item updated.');
      },
      (error) => {
        this.toast.error('Whoops. Item not updated.');
      }
    );
  };

  editModalCloseFinished() {
    this.editFormComponent.reset();
  }

  onStoreButtonClicked = (item: CombinedItem, target: EventTarget = null) => {
    this.storageSelector.target = '#' + target['id'];
    this.storageModal.setData({item: item}, true);
    this.storageModal.open();
  }

  onStorageSelected = (storage: ZeugStorage) => {
    let modalData = this.storageModal.getData();
    let item: CombinedItem = modalData.item;
    this.popups.confirm(`Move ${item.title} to ${storage.title}?`).subscribe(res => {
      if (res) {
        this.storageModal.close();
        let promise = this.itemsService.moveToStorage(item.asZeugItem(), storage);
        promise.then(
          result => {
            this.toast.success(`${modalData.item.title} moved to ${storage.title}.`);
          },
          error => {
            this.toast.error('Error while moving Item.');
          }
        )
      }
    });
  }
}
