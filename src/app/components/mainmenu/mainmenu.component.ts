import { Component, OnInit } from '@angular/core';
import { Menupoint } from '../../models/Menupoint';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  menuPoints: Menupoint[] = [
    {
      target: '/',
      classes: 'icon fas fa-columns',
      text: 'Dashboard'
    },
    {
      target: '/info',
      classes: 'icon fas fa-info',
      text: 'Info'
    },
    {
      target: '/user/profile',
      classes: 'icon fas fa-user',
      text: 'Profile'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
