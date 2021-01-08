import { Component, OnInit, ViewChild } from '@angular/core';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { CombinedStorage } from 'src/app/models/CombinedStorage';
import { ItemsService } from 'src/app/services/items.service';
import { StoragesService } from 'src/app/services/storages.service';
import { NgPopupsService } from 'ng-popups';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageFormComponent } from '../shared/storage-form/storage-form.component';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent implements OnInit {
  items: ZeugItem[] = [];
  storages: ZeugStorage[] = [];
  combinedStorages: CombinedStorage[] = [];

  createModal: NgxSmartModalComponent;

  @ViewChild('createForm') createFormComponent: StorageFormComponent;
  // @ViewChild('editForm') editFormComponent: ItemFormComponent;
  // @ViewChild('storageSelector') storageSelector: NgxSmartModalComponent;

  constructor(
    private itemsService: ItemsService,
    private storagesService: StoragesService,
    private modalService: NgxSmartModalService,
    private router: Router,
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

  ngAfterViewInit(): void {
    this.createModal = this.modalService.get('createStorageFormModal');
    // this.editModal = this.modalService.get('editItemFormModal');
    // this.storageModal = this.modalService.get('storageSelector');
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
    // this.router.navigate(['storages/create/']);
    this.createModal.open();
  };

  onDeleteButtonClicked = (storage: CombinedStorage) => {
    this.popups
      .confirm('Do You really want to delete ' + storage.title + '?', {
        title: 'Think twice!',
        okButtonText: 'Sure!',
        cancelButtonText: 'No',
        color: '#F00',
      })
      .subscribe((res) => {
        if (res) {
          this.deleteStorage(storage);
        }
      });
  };

  deleteStorage(storage: ZeugStorage) {
    let promise = this.storagesService.deleteStorage(storage);

    promise.then(
      (result) => {
        this.toast.success(storage.title + ' deleted.');
        let itemsPromise = this.itemsService.emptyStorage(storage);
        itemsPromise.then(result2 => {
          this.toast.info(result2.toString());
        }).catch(error => {
          this.toast.info(error.toString());
        });
      },
      (error) => {
        this.toast.error('Error when trying to delete ' + storage.title);
      }
    );
  }

  onEditButtonClicked = () => {
    this.toast.info('edit clicked');
  };

  onModalCreateFormSubmit = (storage: ZeugStorage) => {
    let promise = this.storagesService.createStorage(storage);

    promise.then(
      (result) => {
        this.createModal.close();
        this.toast.success('Storage created.');
      },
      (error) => {
        this.toast.error('Whoops. Storage not created.');
      }
    );
  };

  createModalCloseFinished() {
    this.createFormComponent.reset();
  }
}
