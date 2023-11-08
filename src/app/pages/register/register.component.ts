import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/core/interfaces/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/directives/password-match.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ButtonComponent } from 'src/app/shared/components';
import { InputComponent } from 'src/app/shared/components/input/input.component';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm.valueChanges.subscribe((v) => console.log(v));
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    console.log(postData);
    this.authService.registerUser(postData as User).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Account Registered',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
