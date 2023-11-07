import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IGps } from '../interfaces/gps.model';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  url: string = '/assets/gps_data.json';
  constructor(private http: HttpClient) {}

  getGpsData(): Observable<IGps[]> {
    return this.http.get<IGps[]>(this.url);
  }

  getGpsDetail(gpsId: string): Observable<IGps[]> {
    return this.http
      .get<IGps[]>(this.url)
      .pipe(map((data) => data.filter((item) => item.device_id === gpsId)));
  }
}
