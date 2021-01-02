import { Component, Input, OnInit } from '@angular/core';
import { CombinedItem } from 'src/app/models/CombinedItem';

@Component({
  selector: 'app-secondary-item',
  templateUrl: './secondary-item.component.html',
  styleUrls: ['./secondary-item.component.scss']
})
export class SecondaryItemComponent implements OnInit {
  @Input() item: CombinedItem = null;

  constructor() { }

  ngOnInit(): void {
  }

}
