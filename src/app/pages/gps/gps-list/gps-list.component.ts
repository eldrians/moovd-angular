import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IGps } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gps-list.component.html',
})
export class GpsListComponent implements OnInit {
  gpsData: IGps[] = [];

  constructor(private gpsServices: GpsService) {}

  ngOnInit(): void {
    this.getGps();
  }

  getGps() {
    this.gpsServices.getGpsData().subscribe((res: IGps[]) => {
      console.log(res);
      this.gpsData = res;
    });
  }
}
