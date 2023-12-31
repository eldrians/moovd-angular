import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ListGpsInterface } from 'src/app/core/interfaces';
import { GpsService } from 'src/app/core/services';
import { TableComponent } from 'src/app/shared/components';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    FontAwesomeModule,
    TableComponent,
  ],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;

  gpsLists: ListGpsInterface[] = [];
  filteredGpsLists: ListGpsInterface[] = []; // final data

  timesClicked: number = 0;
  timesClickedDeviceType: number = 0;
  timesClickedDeviceId: number = 0;

  _search: string = '';

  columns: { header: string; fieldName: string }[] = [
    { header: 'Device ID', fieldName: 'device_id' },
    { header: 'Device Type', fieldName: 'device_type' },
    { header: 'Action', fieldName: 'action' },
  ];

  set search(input: string) {
    this._search = input;
    this.filteredGpsLists = this.searchGps(input);
  }

  constructor(private gpsServices: GpsService, private router: Router) {}

  ngOnInit(): void {
    this.loadGpsLists();
    this.filteredGpsLists = this.gpsLists;
  }

  viewGps(gpsData: any) {
    this.router.navigate(['gps/', gpsData.device_id]);
  }

  sortGps(deviceType: string) {
    if (deviceType == 'device_id') {
      this.timesClicked = this.sortDeviceId();
    } else if (deviceType == 'device_type') {
      this.timesClicked = this.sortDeviceType();
    } else {
      this.filteredGpsLists = this.gpsLists;
    }
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

    return this.timesClickedDeviceId;
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

    return this.timesClickedDeviceType;
  }
}
