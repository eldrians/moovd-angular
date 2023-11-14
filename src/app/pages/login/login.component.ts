import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from 'src/app/core/services';
import {
  ButtonComponent,
  InputComponent,
  SuccessAlert,
} from 'src/app/shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  checkAccount: boolean = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router: Router
  ) {}

  login() {
    const postData = { ...this.loginForm.value };
    this.authServices.getUserByEmail(postData.email as string).subscribe(
      (res) => {
        if (res.length > 0 && res[0].password === postData.password) {
          localStorage.setItem('email', postData.email as string);
          localStorage.setItem('password', postData.password as string);
          SuccessAlert('Login Success');
          this.router.navigate(['/gps']);
        } else {
          this.checkAccount = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
