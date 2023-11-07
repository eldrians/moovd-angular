import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGps } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gps-detail.component.html',
})
export class GpsDetailComponent implements OnInit {
  gpsIdData: string = '';

  constructor(private gpsServices: GpsService, private router: ActivatedRoute) {
    // let getDeviceId: string | null = this.router.snapshot.paramMap.get('id');
    // this.gpsIdData = getDeviceId;
  }

  ngOnInit(): void {
    this.gpsIdData = this.router.snapshot.params['id'];
    this.getGpsDetail(this.gpsIdData);
  }

  getGpsDetail(gpsId: string) {
    this.gpsServices.getGpsDetail(gpsId).subscribe((res: IGps[]) => {
      console.log(res);
    });
  }
}
