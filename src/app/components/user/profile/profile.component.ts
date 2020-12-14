import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  path: string;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private userService: UserService
  ) {
    this.path = this.router.url;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
  }

  deleteUser() {
    console.warn('really delete?');
    this.userService.delete();
  }

  resendVerificationEmail() {
    console.log('resending...');
    this.userService.sendVerification();
  }

}
