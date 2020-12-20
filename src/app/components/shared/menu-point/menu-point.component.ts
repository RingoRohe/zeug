import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-point',
  templateUrl: './menu-point.component.html',
  styleUrls: ['./menu-point.component.scss']
})
export class MenuPointComponent implements OnInit {
  @Input() to: string = '/';
  @Input() classes: string = '';
  @Input() text: string = 'Link';
  @Input() isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
