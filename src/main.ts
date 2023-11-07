/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppModule } from './app/app.module';
import { GpsListComponent } from './app/pages/gps/gps-list/gps-list.component';
import { GpsDetailComponent } from './app/pages/gps/gps-detail/gps-detail.component';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { authGuard } from './app/core/guard/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'gps',
        component: GpsListComponent,
        canActivate: [authGuard],
      },
      {
        path: 'gps/:id',
        component: GpsDetailComponent,
        canActivate: [authGuard],
      },
      // {
      //   path: 'gps',
      //   loadChildren: () =>
      //     import('./app/pages/gps/gps.routes').then((c) => c.GPS_ROUTES),
      // },
      { path: '', redirectTo: 'gps', pathMatch: 'full' },
      { path: '**', redirectTo: 'gps', pathMatch: 'full' },
    ]),
  ],
}).catch((err) => console.error(err));
