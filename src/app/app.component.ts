import { Component } from '@angular/core';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { FooterComponent, HeaderComponent } from './shared/components';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="w-full flex flex-col lg:flex-row" *ngIf="isMainRoute()">
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
    <div
      class="w-full flex justify-center items-center"
      *ngIf="isLoginOrRegisterRoute()"
    >
      <div class="w-full h-screen">
        <router-outlet class="z-10"></router-outlet>
      </div>
    </div>
  `,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
  ],
})
export class AppComponent {
  constructor(private router: Router) {}
  isMainRoute(): boolean {
    return this.router.url.startsWith('/gps');
  }

  isLoginOrRegisterRoute(): boolean {
    return (
      this.router.url.startsWith('/login') ||
      this.router.url.startsWith('/register')
    );
  }
}
