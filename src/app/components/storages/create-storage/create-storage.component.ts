import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgPopupsService } from 'ng-popups';
import { ToastrService } from 'ngx-toastr';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { StoragesService } from 'src/app/services/storages.service';
import { StorageFormComponent } from '../shared/storage-form/storage-form.component';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.scss'],
})
export class CreateStorageComponent implements OnInit {
  @ViewChild(StorageFormComponent) formComponent: StorageFormComponent;

  constructor(
    private storagesService: StoragesService,
    private toast: ToastrService,
    private popups: NgPopupsService
  ) {}

  ngOnInit(): void {}

  onCreateFormSubmit = (storage: ZeugStorage) => {
    let promise = this.storagesService.createStorage(storage);

    promise.then(
      (result) => {
        this.formComponent.reset();
        this.toast.success('Storage created.');
      },
      (error) => {
        this.toast.error('Whoops. Storage not saved.');
      }
    );
  };
}
