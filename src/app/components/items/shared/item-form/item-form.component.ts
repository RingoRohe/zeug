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

  defaultForm: Object = {};

  @Input() onSubmit: Function;
  @Input() types: ZeugType[];
  @Input() items: ZeugItem[];
  @Input() item: ZeugItem = new ZeugItem();
  @Input() buttonText: string = 'submit';

  constructor(private formBuilder: FormBuilder) {
    this.setDefaultForm();
    this.createForm();
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

  ngOnInit(): void {
  }

  get controls() {
    return this.itemForm.controls;
  }

  // TODO: give back a finished ZeugItem Object, not plain Formdata
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
      formData.isAttachedTo = this.items.find(
        (item) => item.$id === formData.isAttachedTo
      );
    }

    this.onSubmit(formData);
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
    this.setDefaultForm();
    this.createForm();
  }
}
