import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
  }

  onLoginButtonClicked() {
    this.router.navigate(['/user/login']);
  }

  onLogoutButtonClicked() {
    this.userService.logout();
  }

}
