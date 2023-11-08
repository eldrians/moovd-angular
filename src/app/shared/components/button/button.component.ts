import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  template: `
    <button
      type="{{ type }}"
      class="flex w-fit justify-center rounded bg-grayMoovd hover:bg-darkMoovd px-4 py-1.5 text-sm font-semibold text-white shadow"
    >
      {{ text }}
    </button>
  `,
})
export class ButtonComponent {
  @Input() text: string = "";
  @Input() type: string = "";
  constructor() {}
}
