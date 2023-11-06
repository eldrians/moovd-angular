import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent, HeaderComponent } from './shared/components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full flex flex-col lg:flex-row">
      <div class="hidden lg:block lg:w-1/5">
        <app-sidebar class="hidden lg:block lg:w-1/5 lg:fixed"></app-sidebar>
      </div>
      <div class="w-full lg:w-4/5">
        <div class="w-full lg:w-4/5 h-[50px]">
          <app-header class="w-full lg:w-4/5 h-[50px] fixed z-50"></app-header>
        </div>
        <router-outlet class="z-10"></router-outlet>
      </div>
      <div class="w-full block lg:hidden">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterModule],
})
export class AppComponent {}
