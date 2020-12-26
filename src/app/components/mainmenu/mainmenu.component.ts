import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menupoint } from '../../models/Menupoint';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements OnInit {
  currentRoute: string = null;
  menuPoints: Menupoint[] = [];
  menuPointsTemplate: Menupoint[] = [
    {
      target: '/',
      classes: 'icon fas fa-columns',
      text: 'Dashboard',
      isActive: false
    },
    {
      target: '/items',
      classes: 'icon fas fa-cubes',
      text: 'Items',
      isActive: false
    },
    {
      target: '/user/profile',
      classes: 'icon fas fa-user',
      text: 'Profile',
      isActive: false
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url !== undefined && event.url !== this.currentRoute) {
        this.currentRoute = event.url;
        this.menuPoints = [];
        console.log(event.url);

        this.menuPointsTemplate.forEach(mp => {
          mp.isActive = mp.target == this.currentRoute;
          this.menuPoints.push(mp);
        });
      }
    });
  }

}
