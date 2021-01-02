import { Component, OnInit, ViewChild } from '@angular/core';
import { NgPopupsService } from 'ng-popups';
import { ToastrService } from 'ngx-toastr';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugType } from 'src/app/models/ZeugType';
import { ItemsService } from 'src/app/services/items.service';
import { TypesService } from 'src/app/services/types.service';
import { ItemFormComponent } from '../shared/item-form/item-form.component';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  types: ZeugType[];
  items: ZeugItem[];

  @ViewChild(ItemFormComponent) formComponent: ItemFormComponent;

  constructor(
    private typesService: TypesService,
    private itemsService: ItemsService,
    private toast: ToastrService,
    private popups: NgPopupsService
  ) {}

  ngOnInit(): void {
    this.types = this.typesService.types;
    this.typesService.typesChanged.subscribe((response) => {
      this.types = response;
    });
    this.items = this.itemsService.items;
    this.itemsService.itemsChanged.subscribe((response) => {
      this.items = response;
    });
  }

  onCreateFormSubmit = (data) => {
    let newItem = ZeugItem.fromObject(data);
    let promise = this.itemsService.createItem(newItem);

    promise.then(
      (result) => {
        this.formComponent.reset();
        this.toast.success('Item created.');
      },
      (error) => {
        this.toast.error('Whoops. Item not saved.');
      }
    );
  };
}
