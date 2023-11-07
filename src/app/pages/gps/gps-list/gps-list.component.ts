import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListGpsInterface } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  gpsLists: ListGpsInterface[] = [];

  constructor(private gpsServices: GpsService) {}

  ngOnInit(): void {
    this.getGpsLists();
  }
  getGpsLists() {
    this.gpsServices.getGpsLists().subscribe((res: ListGpsInterface[]) => {
      this.gpsLists = res.reverse();
    });
  }
}
