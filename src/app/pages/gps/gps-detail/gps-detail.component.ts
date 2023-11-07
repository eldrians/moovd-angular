import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GpsService } from 'src/app/core/services';

@Component({
  selector: 'app-gps-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gps-detail.component.html',
})
export class GpsDetailComponent implements OnInit {
  movieIdData: string | null = '';

  constructor(private gpsServices: GpsService, private router: ActivatedRoute) {
    let getDeviceId: string | null = this.router.snapshot.paramMap.get('id');
    this.movieIdData = getDeviceId;
  }

  ngOnInit(): void {
    this.getGpsDetail(this.movieIdData);
  }

  getGpsDetail(movieId: string | null) {}
}
