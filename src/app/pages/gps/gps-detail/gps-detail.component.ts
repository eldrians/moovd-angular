import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailGpsInterface } from 'src/app/core/interfaces/gps.model';
import { GpsService } from 'src/app/core/services';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  ChartInterface,
  DataPointInterface,
} from 'src/app/core/interfaces/canvas.model';

@Component({
  selector: 'app-gps-detail',
  standalone: true,
  imports: [CommonModule, CanvasJSAngularChartsModule, RouterModule],
  templateUrl: './gps-detail.component.html',
})
export class GpsDetailComponent implements OnInit {
  gpsIdData: string = '';
  gpsDetail: DetailGpsInterface | undefined;
  chartOptions: ChartInterface | undefined;

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
      .subscribe((res: DetailGpsInterface[]) => {
        console.log(res[0]);
        this.gpsDetail = res[0];
        this.chartHandle(res[0]);
      });
  }

  chartHandle(data: DetailGpsInterface): void {
    const totalTimeSpent = data.totalTimeSpent;
    const dataPoints: DataPointInterface[] = data.device_location.map(
      (location) => ({
        name: location.location,
        y: (location.totalTimestamp * 100) / totalTimeSpent,
      })
    );
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: '',
      },
      data: [
        {
          type: 'pie',
          startAngle: -90,
          indexLabel: '{name}: {y}',
          yValueFormatString: "#,###.##'%'",
          dataPoints: dataPoints,
        },
      ],
    };
  }
}
