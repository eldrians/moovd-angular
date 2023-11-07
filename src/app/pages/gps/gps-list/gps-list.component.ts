import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ListGpsInterface } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  _filtertext: string = '';

  gpsLists: ListGpsInterface[] = [];
  filteredGpsLists: ListGpsInterface[] = []; //changeable

  clickNumber: number = 0;

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
      this.gpsLists = res.reverse();
      this.filteredGpsLists = res.reverse();
    });
  }

  sortClick() {
    this.clickNumber += 1;
    if (this.clickNumber === 3) {
      this.clickNumber = 0;
    }

    if (this.clickNumber == 0) {
      this.filteredGpsLists.sort((a, b) =>
        a.device_type.localeCompare(b.device_type)
      );
    } else if (this.clickNumber == 1) {
      this.filteredGpsLists.sort((a, b) =>
        b.device_type.localeCompare(a.device_type)
      );
    } else {
      this.filteredGpsLists = this.filteredGpsLists.reverse();
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
