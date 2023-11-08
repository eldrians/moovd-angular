import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ListGpsInterface } from 'src/app/core/interfaces';
import { GpsService } from 'src/app/core/services';
import { SortIconComponent } from 'src/app/shared/components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { faMagnifyingGlass, faEye } from '@fortawesome/free-solid-svg-icons';
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
  ],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faEye = faEye;
  p: number = 1;
  _filtertext: string = '';

  gpsLists: ListGpsInterface[] = [];
  filteredGpsLists: ListGpsInterface[] = []; //changeable

  clickNumberDeviceType: number = 0;
  clickNumberDeviceId: number = 0;

  get filterText() {
    return this._filtertext;
  }

  set filterText(value: string) {
    this._filtertext = value;
    this.filteredGpsLists = this.filterGps(value);
  }

  constructor(private gpsServices: GpsService) {}

  ngOnInit(): void {
    this.getGpsLists();
    this.filteredGpsLists = this.gpsLists;
  }
  getGpsLists() {
    this.gpsServices.getGpsLists().subscribe((res: ListGpsInterface[]) => {
      this.gpsLists = res;
      this.filteredGpsLists = res.reverse();
    });
  }

  sortClickDeviceType() {
    this.clickNumberDeviceId = 0;
    this.clickNumberDeviceType += 1;
    if (this.clickNumberDeviceType === 3) {
      this.clickNumberDeviceType = 0;
    }

    if (this.clickNumberDeviceType == 1) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        a.device_type.localeCompare(b.device_type)
      );
    } else if (this.clickNumberDeviceType == 2) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        b.device_type.localeCompare(a.device_type)
      );
    } else {
      this.filteredGpsLists = this.gpsLists;
    }
  }

  sortClickDeviceId() {
    this.clickNumberDeviceType = 0;
    this.clickNumberDeviceId += 1;
    if (this.clickNumberDeviceId === 2) {
      this.clickNumberDeviceId = 0;
    }
    if (this.clickNumberDeviceId == 1) {
      this.filteredGpsLists = [...this.gpsLists].sort((a, b) =>
        a.device_id.localeCompare(b.device_id)
      );
    } else {
      this.filteredGpsLists = this.gpsLists;
    }
  }

  filterGps(filterTerm: string) {
    if (this.gpsLists.length === 0 || this.filterText === '') {
      return this.gpsLists;
    } else {
      const searchTerm = filterTerm.toLowerCase();
      return this.gpsLists.filter((gps) => {
        return (
          gps.device_type.toLowerCase().includes(searchTerm) ||
          gps.device_id.toLowerCase().includes(searchTerm)
        );
      });
    }
  }
}
