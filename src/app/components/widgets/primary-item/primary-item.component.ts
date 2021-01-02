import { Component, Input, OnInit } from '@angular/core';
import { CombinedItem } from 'src/app/models/CombinedItem';

@Component({
  selector: 'app-primary-item',
  templateUrl: './primary-item.component.html',
  styleUrls: ['./primary-item.component.scss']
})
export class PrimaryItemComponent implements OnInit {
  @Input() item: CombinedItem = null;
  @Input() onDelete: Function;

  constructor() {}

  ngOnInit(): void {}

  onDeleteItemButtonClicked() {
    this.onDelete(this.item);
  }
}
