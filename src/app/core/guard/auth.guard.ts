import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService
      .getUserByEmail(localStorage.getItem('email') as string)
      .pipe(
        map((res) => {
          if (
            res.length > 0 &&
            res[0].password == localStorage.getItem('password')
          ) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        }),
        catchError((error) => {
          this.router.navigate(['login']);
          return of(false);
        })
      );
  }
}
