import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombinedStorage } from 'src/app/models/CombinedStorage';

@Component({
  selector: 'app-primary-storage',
  templateUrl: './primary-storage.component.html',
  styleUrls: ['./primary-storage.component.scss'],
})
export class PrimaryStorageComponent implements OnInit {
  @Input() storage: CombinedStorage = null;
  @Input() onEdit: Function;
  @Input() onStore: Function;
  @Input() onDelete: Function;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onEditStorageButtonClicked() {
    if (this.onEdit) {
      this.onEdit(this.storage);
    } else {
      this.router.navigate(['storages/edit/', this.storage.$id]);
    }
  }

  onStoreStorageButtonClicked(event) {
    this.onStore(this.storage, event.target);
  }

  onDeleteStorageButtonClicked() {
    this.onDelete(this.storage);
  }
}
