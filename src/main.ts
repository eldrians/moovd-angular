/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, isDevMode } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { GpsListComponent } from './app/pages/gps/gps-list/gps-list.component';
import { GpsDetailComponent } from './app/pages/gps/gps-detail/gps-detail.component';
import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { AuthGuard } from './app/core/guard/auth.guard';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
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
        canActivate: [AuthGuard],
      },
      {
        path: 'gps/:id',
        component: GpsDetailComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'gps', pathMatch: 'full' },
      { path: '**', redirectTo: 'gps', pathMatch: 'full' },
    ]),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}).catch((err) => console.error(err));
