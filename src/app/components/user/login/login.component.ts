import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  loginForm: FormGroup;
  success: boolean = false;
  error: string = null;
  loading: boolean = false;
  private backlink: string = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
    this.route.queryParams.subscribe((params) => {
      this.backlink = params.backlink;
    });
  }

  onLoginFormSubmit(formData): void {
    this.loading = true;
    this.userService.login(formData.email, formData.password)
      .then(
        (success) => {
          this.success = true;
          this.error = null;
          console.log(success);
          if (this.backlink) {
            this.router.navigate([this.backlink]);
          }
        },
        (error) => {
          this.success = false;
          this.error = error;
          console.log(error);
        }
      )
      .finally(
        () => {
          this.loginForm.reset();
          this.loading = false;
        }
      );
  }

}
