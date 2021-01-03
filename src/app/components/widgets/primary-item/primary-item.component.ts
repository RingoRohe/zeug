import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombinedItem } from 'src/app/models/CombinedItem';

@Component({
  selector: 'app-primary-item',
  templateUrl: './primary-item.component.html',
  styleUrls: ['./primary-item.component.scss']
})
export class PrimaryItemComponent implements OnInit {
  @Input() item: CombinedItem = null;
  @Input() onEdit: Function;
  @Input() onDelete: Function;

  constructor(private router: Router) {}

  ngOnInit(): void { }

  onEditItemButtonClicked() {
    if (this.onEdit) {
      this.onEdit(this.item);
    } else {
      this.router.navigate(['items/edit/', this.item.$id]);
    }
  }

  onDeleteItemButtonClicked() {
    this.onDelete(this.item);
  }
}
