import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ButtonComponent } from "../index";

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterModule, ButtonComponent, SweetAlert2Module],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  constructor(private router: Router) {}
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
