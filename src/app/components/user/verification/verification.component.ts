import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  currentUser: User;
  currentPath: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    // get current url path
    this.currentPath = this.router.url;

    // listen if User changes
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });

    // listen to query Parameters to get the Verification Data if present
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.userId && params.secret) {
        // someone is trying to verify his account
        this.userService.updateVerification(params.userId, params.secret);
      }
    });
  }

  ngOnInit(): void {
  }

  resendVerificationEmail() {
    console.log('resending...');
    this.userService.sendVerification();
  }

}
