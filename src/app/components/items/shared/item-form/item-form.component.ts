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

  @Input() onSubmit: Function;
  @Input() types: ZeugType[];
  @Input() items: ZeugItem[];

  constructor(private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: [null, [Validators.required]],
      isPrimary: [false],
      description: [''],
      firstDayOfUse: [moment().format('YYYY-MM-DD')],
      manufacturer: [''],
      model: [''],
      isAttachedTo: [null]
    });
  }

  ngOnInit(): void { }

  get controls() {
    return this.itemForm.controls;
  }

  onItemFormSubmit(formData): void {
    this.loading = true;

    // format date to timestamp
    formData.firstDayOfUse = moment(formData.firstDayOfUse).format('X');

    // replace type ID with type object
    if (formData.type) {
      formData.type = this.types.find(item => item.$id === formData.type);
    }

    // replace attachedTo ID with actual object
    if (formData.isAttachedTo) {
      formData.isAttachedTo = this.items.find(item => item.$id === formData.isAttachedTo);
    }

    this.onSubmit(formData);
  }

  reset() {
    this.success = false;
    this.error = null;
    this.loading = false;
    this.itemForm.reset();
  }
}
