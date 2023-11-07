import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GpsInterface, IGps } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  gpsItems: GpsInterface[] = [];

  constructor(private gpsServices: GpsService) {}

  ngOnInit(): void {
    this.getGpsItem();
  }
  getGpsItem() {
    this.gpsServices.getGpsItems().subscribe((res: GpsInterface[]) => {
      console.log(res);
      this.gpsItems = res;
    });
  }
}
