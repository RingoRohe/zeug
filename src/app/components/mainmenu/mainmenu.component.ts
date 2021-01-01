import { Component, OnInit } from '@angular/core';
import { Menupoint } from '../../models/Menupoint';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  currentRoute: string = null;
  menuPoints: Menupoint[] = [
    {
      target: '/',
      classes: 'icon fas fa-columns',
      text: 'Dashboard'
    },
    {
      target: '/items',
      classes: 'icon fas fa-cubes',
      text: 'Items'
    },
    {
      target: '/user/profile',
      classes: 'icon fas fa-user',
      text: 'Profile'
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
  }

}
