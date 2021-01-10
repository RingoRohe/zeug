import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ZeugStorage } from 'src/app/models/ZeugStorage';
import { StoragesService } from 'src/app/services/storages.service';
import { StorageFormComponent } from '../shared/storage-form/storage-form.component';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss'],
})
export class EditStorageComponent implements OnInit {
  storage: ZeugStorage = new ZeugStorage();

  @ViewChild(StorageFormComponent) formComponent: StorageFormComponent;

  constructor(
    private storagesService: StoragesService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.storage = this.storagesService.getStorage;
  }

  ngAfterViewInit() {
    this.formComponent.loading = true;
    this.route.params.subscribe((data) => {
      let promise = this.storagesService.getStorage(data.id);

      promise.then(
        (result) => {
          this.storage = ZeugStorage.fromAppwriteDocument(
            new ZeugStorage(),
            result
          );
          this.formComponent.update(this.storage);
          this.formComponent.loading = false;
        },
        (error) => {
          this.toast.error('Error loading Storage');
        }
      );
    });
  }

  onEditFormSubmit = (storage: ZeugStorage) => {
    this.storage = storage;
    let promise = this.storagesService.updateStorage(this.storage);

    promise.then(
      (result) => {
        this.formComponent.reset();
        this.formComponent.update(this.storage);
        this.toast.success('Storage updated.');
        this.location.back();
      },
      (error) => {
        this.toast.error('Whoops. Storage not updated.');
      }
    );
  };
}
