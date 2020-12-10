import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
  }

  onLoginFormSubmit(formData): void {
    this.loading = true;
    this.userService.login(formData.email, formData.password)
      .then(
        (success) => {
          this.loginForm.reset();
          this.success = true;
          this.error = null;
          console.log(success);
        },
        (error) => {
          this.loginForm.reset();
          this.error = error;
          this.success = false;
          console.log(error);
        }
      )
      .finally(
        () => {
          this.loading = false;
        }
      );
  }

}
