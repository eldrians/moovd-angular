import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="p-1 border border-primaryApp group rounded text-xs md:text-sm"
    >
      button!
    </button>
  `,
})
export class ButtonComponent {}
