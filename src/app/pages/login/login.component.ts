import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from 'src/app/core/services';
import { ButtonComponent, InputComponent } from 'src/app/shared/components';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    SweetAlert2Module,
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

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authServices.getUserByEmail(email as string).subscribe(
      (res) => {
        console.log('res email->', res);
        console.log('res length->', res.length);

        if (res.length > 0 && res[0].password === password) {
          localStorage.setItem('email', email as string);
          localStorage.setItem('password', res[0].password as string);
          Swal.fire({
            icon: 'success',
            title: 'Login Sucess',
            showConfirmButton: false,
            timer: 1500,
          });
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
