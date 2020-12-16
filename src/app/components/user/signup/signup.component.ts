import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  currentUser: User;
  signupForm: FormGroup;
  success: boolean;
  error: boolean;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]]
    }, {validator: this.passwordConfirming});
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get password_confirm() {
    return this.signupForm.get('password_confirm');
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.userService.userHasChanged.subscribe((data) => {
      this.currentUser = data;
    });
  }

  onLoginFormSubmit() {
    this.loading = true;
  }

  passwordConfirming(c: AbstractControl): { password_missmatch: boolean } {
    if (c.get('password').value !== c.get('password_confirm').value) {
      c.get('password_confirm').setErrors({invalid: true});
      return {password_missmatch: true};
    } else {
      c.get('password_confirm').setErrors(null);
    }
  }

}
