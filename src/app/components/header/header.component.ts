import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';
import { Router } from '@angular/router';

interface MenuPoint {
  target: string,
  classes: string,
  text: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  menuPoints: MenuPoint[] = [
    {
      target: '/',
      classes: 'icon fas fa-columns fa-3x',
      text: 'Dashboard'
    },
    {
      target: '/info',
      classes: 'icon fas fa-info fa-3x',
      text: 'Info'
    },
    {
      target: '/user/profile',
      classes: 'icon fas fa-user fa-3x',
      text: 'Profile'
    }
  ]

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
      console.log('user has changed', data);
    });
  }

  onLoginButtonClicked() {
    this.router.navigate(['/user/login']);
  }

  onLogoutButtonClicked() {
    this.userService.logout();
  }

}
