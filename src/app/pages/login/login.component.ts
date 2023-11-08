import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ButtonComponent } from 'src/app/shared/components';
import { InputComponent } from 'src/app/shared/components/input/input.component';

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
      (response) => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
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
