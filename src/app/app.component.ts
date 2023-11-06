import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
} from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>
      <!-- Header -->
      <div>
        <app-header></app-header>
      </div>
      <!-- Content -->
      <div>
        <router-outlet></router-outlet>
      </div>
      <!-- Footer -->
      <div>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, RouterModule],
})
export class AppComponent {}
