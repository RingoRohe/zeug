import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugType } from 'src/app/models/ZeugType';
import moment from 'moment';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  success: boolean = false;
  error: string = null;
  loading: boolean = false;
  _items: ZeugItem[] = [];
  itemsToShow: ZeugItem[] = [];

  defaultForm: Object = {};

  @Input() onSubmit: Function;
  @Input() types: ZeugType[];
  @Input() item: ZeugItem = new ZeugItem();
  @Input() buttonText: string = 'submit';
  @Input() set items(value: ZeugItem[]) {
    this._items = value;
    this.filterItemsToShow();
  };

  constructor(private formBuilder: FormBuilder) {
  }

  setDefaultForm() {
    this.defaultForm = {
      title: [this.item.title, [Validators.required]],
      type: [this.item.type ? this.item.type.$id : null, [Validators.required]],
      isPrimary: [this.item.isPrimary],
      description: [this.item.description],
      firstDayOfUse: [
        this.item.firstDayOfUse
          ? moment.unix(this.item.firstDayOfUse).format('YYYY-MM-DD')
          : moment().format('YYYY-MM-DD'),
      ],
      manufacturer: [this.item.manufacturer],
      model: [this.item.model],
      isAttachedTo: [
        this.item.isAttachedTo ? this.item.isAttachedTo.$id : null,
      ],
    };
  }

  createForm() {
    this.itemForm = this.formBuilder.group(this.defaultForm);
  }

  filterItemsToShow = () => {
    if (!this.item) {
      this.itemsToShow = this._items;
      return;
    }
    this.itemsToShow = this._items.filter(item => item.$id != this.item.$id);
  }

  ngOnInit(): void {
    this.filterItemsToShow();
    this.setDefaultForm();
    this.createForm();
  }

  get controls() {
    return this.itemForm.controls;
  }

  onItemFormSubmit(formData): void {
    this.loading = true;

    // format date to timestamp
    formData.firstDayOfUse = moment(formData.firstDayOfUse).format('X');

    // replace type ID with type object
    if (formData.type) {
      formData.type = this.types.find((item) => item.$id === formData.type);
    }

    // replace attachedTo ID with actual object
    if (formData.isAttachedTo) {
      formData.isAttachedTo = this._items.find(
        (item) => item.$id === formData.isAttachedTo
      );
    }

    if (!this.item) {
      this.item = new ZeugItem();
    }
    Object.assign(this.item, formData);
    this.item = ZeugItem.fromObject(this.item);

    this.onSubmit(this.item);
  }

  reset() {
    this.success = false;
    this.error = null;
    this.loading = false;
    this.itemForm.reset();
    this.createForm();
  }

  update(item: ZeugItem) {
    this.item = item;
    this.filterItemsToShow();
    this.setDefaultForm();
    this.createForm();
  }
}
