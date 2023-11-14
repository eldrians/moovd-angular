import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import Swal from "sweetalert2";

export const SuccessAlert = (title: string) => {
  Swal.fire({
    icon: "success",
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
