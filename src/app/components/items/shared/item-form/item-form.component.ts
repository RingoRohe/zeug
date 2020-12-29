import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  get controls() {
    return this.itemForm.controls;
  }

  onItemFormSubmit(formData): void {
    this.loading = true;
    this.onSubmit();
  }
}
