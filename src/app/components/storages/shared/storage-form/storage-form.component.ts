import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZeugStorage } from 'src/app/models/ZeugStorage';

@Component({
  selector: 'app-storage-form',
  templateUrl: './storage-form.component.html',
  styleUrls: ['./storage-form.component.scss'],
})
export class StorageFormComponent implements OnInit {
  storageForm: FormGroup;
  loading: boolean = false;

  defaultForm: Object = {};

  @Input() storage: ZeugStorage = new ZeugStorage();
  @Input() onSubmit: Function;
  @Input() buttonText: string = 'submit';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setDefaultForm();
    this.createForm();
  }

  onStorageFormSubmit(formData): void {
    this.loading = true;

    Object.assign(this.storage, formData);
    this.storage = ZeugStorage.fromObject(this.storage);

    this.onSubmit(this.storage);
  }

  get controls() {
    return this.storageForm.controls;
  }

  setDefaultForm() {
    this.defaultForm = {
      title: [this.storage.title, [Validators.required]],
      description: [this.storage.description],
    };
  }

  createForm() {
    this.storageForm = this.formBuilder.group(this.defaultForm);
  }

  reset() {
    this.loading = false;
    this.storageForm.reset();
    this.createForm();
  }

  update(storage: ZeugStorage) {
    this.storage = storage;
    this.setDefaultForm();
    this.createForm();
  }
}
