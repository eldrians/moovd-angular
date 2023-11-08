import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "sort-icon",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <fa-icon *ngIf="timesClicked == 1" [icon]="faSortDown"></fa-icon>
    <fa-icon *ngIf="timesClicked == 2" [icon]="faSortUp"></fa-icon>
    <fa-icon *ngIf="timesClicked == 0" [icon]="faSort"></fa-icon>
  `,
})
export class SortIconComponent {
  faSort = faSort;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  @Input() timesClicked: number = 0;
}
