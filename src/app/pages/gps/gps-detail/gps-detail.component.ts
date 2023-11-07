import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GpsLocationInterface, IGps } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gps-detail.component.html',
})
export class GpsDetailComponent implements OnInit {
  gpsIdData: string = '';

  constructor(
    private gpsServices: GpsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gpsIdData = this.router.snapshot.params['id'];
    this.getGpsDetail(this.gpsIdData);
  }

  getGpsDetail(deviceId: string) {
    this.gpsServices
      .getGpsDetail(deviceId)
      .subscribe((res: GpsLocationInterface[]) => {
        console.log(res);
      });
  }
}
