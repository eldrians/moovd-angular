import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table.component.html",
})
export class TableComponent {
  @Input() header: string[] = [];
  @Input() tableData: any[] = [];

  constructor() {}
}
