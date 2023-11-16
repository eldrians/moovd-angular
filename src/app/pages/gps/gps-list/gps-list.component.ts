import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ListGpsInterface } from 'src/app/core/interfaces';
import { GpsService } from 'src/app/core/services';
import { SortIconComponent, TableComponent } from 'src/app/shared/components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    SortIconComponent,
    NgxPaginationModule,
    FontAwesomeModule,
    TableComponent,
  ],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faEye = faEye;
  currentPage: number = 1;

  gpsLists: ListGpsInterface[] = [];
  filteredGpsLists: ListGpsInterface[] = []; // final data

  timesClickedDeviceType: number = 0;
  timesClickedDeviceId: number = 0;

  _search: string = '';

  set search(input: string) {
    this._search = input;
    this.filteredGpsLists = this.searchGps(input);
  }

  constructor(private gpsServices: GpsService) {}

  ngOnInit(): void {
    this.loadGpsLists();
    this.filteredGpsLists = this.gpsLists;
  }

  loadGpsLists() {
    this.gpsServices.getGpsLists().subscribe((res: ListGpsInterface[]) => {
      this.gpsLists = res;
      this.filteredGpsLists = res.reverse();
    });
  }

  searchGps(input: string) {
    if (this.gpsLists.length === 0 || this.search === '') {
      return this.gpsLists;
    } else {
      const searchTerm = input.toLowerCase();
      return this.gpsLists.filter((gps) => {
        return (
          gps.device_type.toLowerCase().includes(searchTerm) ||
          gps.device_id.toLowerCase().includes(searchTerm)
        );
      });
    }
  }

  sortDeviceId() {
    this.timesClickedDeviceType = 0;

    this.timesClickedDeviceId++;
    if (this.timesClickedDeviceId > 1) {
      this.timesClickedDeviceId = 0;
    }
    if (this.timesClickedDeviceId == 1) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        a.device_id.localeCompare(b.device_id)
      );
    } else {
      this.filteredGpsLists = this.gpsLists;
    }
  }

  sortDeviceType() {
    this.timesClickedDeviceId = 0;
    this.timesClickedDeviceType++;
    if (this.timesClickedDeviceType > 2) {
      this.timesClickedDeviceType = 0;
    }

    if (this.timesClickedDeviceType == 1) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        a.device_type.localeCompare(b.device_type)
      );
    } else if (this.timesClickedDeviceType == 2) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        b.device_type.localeCompare(a.device_type)
      );
    } else {
      this.filteredGpsLists = this.gpsLists;
    }
  }
}
