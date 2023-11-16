import { Routes } from '@angular/router';
import { GpsListComponent } from './gps-list/gps-list.component';
import { GpsDetailComponent } from './gps-detail/gps-detail.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

export const GPS_ROUTES: Routes = [
  {
    path: '',
    component: GpsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: GpsDetailComponent,
    canActivate: [AuthGuard],
  },
];
