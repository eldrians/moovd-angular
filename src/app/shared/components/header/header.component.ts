import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";
import { ButtonComponent } from "../index";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SweetAlert2Module,
    ButtonComponent,
  ],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faX = faX;

  isOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuClick(this.isOpen);
  }

  menuClick(b: boolean) {
    this.isOpen = b;
  }

  logOut() {
    Swal.fire({
      title: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Logout!",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.clear();
        this.router.navigate(["login"]);
      }
    });
  }
}
