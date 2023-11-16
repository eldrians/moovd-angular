import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

import { SortIconComponent } from "src/app/shared/components";

import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-table",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SortIconComponent,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  templateUrl: "./table.component.html",
})
export class TableComponent {
  @Input() columns: any[] = [];
  @Input() tableData: any[] = [];
  @Input() showActionButton: boolean = false;
  @Input() enableSort: boolean = false;
  @Input() timesClicked: number = 0;
  @Output() onSort = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();

  clickedFieldName: string = "";
  faEye = faEye;
  currentPage: number = 1;

  viewData(data: any) {
    this.onView.emit(data);
  }

  sortData(data: any) {
    this.clickedFieldName = data;
    this.onSort.emit(data);
  }
}
