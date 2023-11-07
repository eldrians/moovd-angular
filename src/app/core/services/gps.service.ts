import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GpsInterface, IGps } from '../interfaces/gps.model';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  url: string = '/assets/gps_data.json';
  constructor(private http: HttpClient) {}

  getGpsData(): Observable<IGps[]> {
    return this.http.get<IGps[]>(this.url);
  }

  getGpsItems(): Observable<GpsInterface[]> {
    return this.http.get<IGps[]>(this.url).pipe(
      map((data) => {
        const groupedData: GpsInterface[] = data.reduce((acc: any, item) => {
          if (!acc[item.device_id]) {
            acc[item.device_id] = {
              device_id: item.device_id,
              device_type: item.device_type,
              location: [],
            };
          }
          if (!acc[item.device_id].location.includes(item.location)) {
            acc[item.device_id].location.push(item.location);
          }
          return acc;
        }, {});
        return Object.values(groupedData);
      })
    );
  }

  getGpsDetail(gpsId: string): Observable<IGps[]> {
    return this.http
      .get<IGps[]>(this.url)
      .pipe(map((data) => data.filter((item) => item.device_id === gpsId)));
  }
}
