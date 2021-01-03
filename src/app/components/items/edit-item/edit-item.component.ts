import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgPopupsService } from 'ng-popups';
import { ToastrService } from 'ngx-toastr';
import { ZeugItem } from 'src/app/models/ZeugItem';
import { ZeugType } from 'src/app/models/ZeugType';
import { ItemsService } from 'src/app/services/items.service';
import { TypesService } from 'src/app/services/types.service';
import { ItemFormComponent } from '../shared/item-form/item-form.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})
export class EditItemComponent implements OnInit, AfterViewInit {
  types: ZeugType[];
  items: ZeugItem[];
  item: ZeugItem;

  @ViewChild(ItemFormComponent) formComponent: ItemFormComponent;

  constructor(
    private typesService: TypesService,
    private itemsService: ItemsService,
    private toast: ToastrService,
    private popups: NgPopupsService,
    private route: ActivatedRoute
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

  ngAfterViewInit() {
    this.formComponent.loading = true;
    this.route.params.subscribe((data) => {
      let promise = this.itemsService.getItem(data.id);

      promise.then(
        (result) => {
          this.item = ZeugItem.fromAppwriteDocument(new ZeugItem(), result);
          this.formComponent.update(this.item);
          this.formComponent.loading = false;
        },
        (error) => {
          this.toast.error('Error loading Item');
        }
      );
    });
  }

  onEditFormSubmit = (item: ZeugItem) => {
    this.item = item;
    let promise = this.itemsService.updateItem(this.item);

    promise.then(
      (result) => {
        this.formComponent.reset();
        this.formComponent.update(this.item);
        this.toast.success('Item updated.');
      },
      (error) => {
        this.toast.error('Whoops. Item not updated.');
      }
    );
  };
}
