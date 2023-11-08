import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <button
      *ngIf="!forLink"
      type="{{ type }}"
      class="flex w-full justify-center rounded bg-grayMoovd hover:bg-darkMoovd px-3 py-1.5 text-sm font-semibold text-white shadow"
    >
      {{ text }}
    </button>
    <button
      *ngIf="forLink"
      class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
      [routerLink]="['/gps', deviceId]"
    >
      View
    </button>
  `,
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() type: string = "submit";
  @Input() forLink: boolean = false;
  @Input() deviceId: string = "";
  constructor() {}
}
