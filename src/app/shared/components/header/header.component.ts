import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faX = faX;

  isOpen: boolean = false;

  ngOnInit() {
    this.menuClick(this.isOpen);
  }

  menuClick(b: boolean) {
    this.isOpen = b;
  }
}
