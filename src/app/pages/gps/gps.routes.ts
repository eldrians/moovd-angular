import { Routes } from '@angular/router';
import { GpsListComponent } from './gps-list/gps-list.component';
import { GpsDetailComponent } from './gps-detail/gps-detail.component';

export const GPS_ROUTES: Routes = [
  {
    path: '',
    component: GpsListComponent,
  },
  {
    path: ':id',
    component: GpsDetailComponent,
  },
];
