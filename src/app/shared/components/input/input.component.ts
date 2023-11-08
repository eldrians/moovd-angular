import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <label
        [for]="inputId"
        class="block text-xs font-medium leading-6 text-darkMoovd"
        >{{ label }}</label
      >
      <div class="mt-0.5">
        <input
          [class.invalid]="control.invalid && control.dirty && control.touched"
          [formControl]="control"
          [type]="type"
          [id]="inputId"
          [name]="inputId"
          [placeholder]="placeholder"
          class="block w-full rounded border-0 py-1.5 px-2 text-darkMoovd ring-1 ring-grayMoovd/30 focus:outline-none placeholder:text-grayMoovd/50 sm:text-sm"
        />
      </div>
    </div>
    <ng-container *ngIf="control.invalid && control.dirty && control.touched">
      <div *ngFor="let err of control.errors | keyvalue">
        <small class="text-xs text-red-500">{{ errorMessages[err.key] }}</small>
      </div>
    </ng-container>
  `,
})
export class InputComponent {
  @Input() type: string = "text";
  @Input() label = "";
  @Input() inputId = "";
  @Input() control = new FormControl();
  @Input() placeholder: string = "";

  errorMessages: Record<string, string> = {
    required: "The field is required",
    email: "The email is invalid",
    pattern: "Enter a valid value",
  };
}
