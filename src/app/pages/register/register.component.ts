import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { User } from 'src/app/core/interfaces';
import { AuthService } from 'src/app/core/services';
import { passwordMatchValidator } from 'src/app/shared/directives';
import {
  ButtonComponent,
  InputComponent,
  SuccessAlert,
} from 'src/app/shared/components';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      fullName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  register() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      (res) => {
        SuccessAlert('Account Registered');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
