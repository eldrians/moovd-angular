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
  gpsMoreDetail: {
    location: string;
    timestamp: string[];
    totalTimestamp: number;
  }[] = [];

  gpsSuperDetail:
    | {
        device_id: string;
        device_type: string;
        device_location: {
          location: string;
          timestamp: string[];
          totalTimestamp: number;
        }[];
        totalTimeSpent: number;
      }
    | undefined;

  gpsIdData: string = '';
  gpsDetail: GpsLocationInterface[] = [];

  total: number = 0;

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
        this.gpsDetail = res;
        res.map((n: any) => {
          this.gpsMoreDetail.push({
            location: n.location,
            timestamp: n.timestamp,
            totalTimestamp: this.calculateTimeSpent(n.timestamp),
          });
          this.total += this.calculateTimeSpent(n.timestamp);
        });

        this.gpsSuperDetail = {
          device_id: this.gpsIdData,
          device_type: 'x',
          device_location: this.gpsMoreDetail,
          totalTimeSpent: this.total,
        };

        console.log(this.gpsSuperDetail);
      });
  }

  calculateTimeSpent(timestamps: string[]): number {
    const dateObjects = timestamps.map((timestamp) => {
      const parts = timestamp.split(' ');
      const dateParts = parts[0].split('-');
      const timeParts = parts[1].split('.');

      // Parse the date and time components
      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1; // JavaScript months are 0-based
      const day = parseInt(dateParts[0]);
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);

      return new Date(year, month, day, hours, minutes);
    });

    let totalTimeSpent = 5;
    for (let i = 1; i < dateObjects.length; i++) {
      const timeDifference =
        dateObjects[i].getTime() - dateObjects[i - 1].getTime();
      const timeSpentInMinutes = timeDifference / (1000 * 60);
      totalTimeSpent += timeSpentInMinutes;
    }
    return totalTimeSpent;
  }
}
