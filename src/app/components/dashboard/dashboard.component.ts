import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { ZeugItem } from '../../models/ZeugItem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: ZeugItem[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.listItems().then(response => {
      Array.from(response['documents']).forEach((document: Object) => {
        this.items.push(ZeugItem.fromAppwriteDocument(new ZeugItem, document));
      });
    });
  }

  onCreateButtonClicked() {
    this.api.createItem();
  }

}
