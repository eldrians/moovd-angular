import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  DeviceData,
  GpsInterface,
  GpsLocationInterface,
  IGps,
  ListGpsInterface,
} from '../interfaces/gps.model';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  url: string = '/assets/gps_data.json';
  constructor(private http: HttpClient) {}

  getGpsData(): Observable<IGps[]> {
    return this.http.get<IGps[]>(this.url);
  }

  getGpsList(): Observable<ListGpsInterface[]> {
    return this.http.get<IGps[]>(this.url).pipe(
      map((data) => {
        const groupedData: ListGpsInterface[] = data.reduce(
          (acc: any, item) => {
            if (!acc[item.device_id]) {
              acc[item.device_id] = {
                device_id: item.device_id,
                device_type: item.device_type,
              };
            }
            return acc;
          },
          {}
        );
        return Object.values(groupedData);
      })
    );
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

  getGpsDetail(deviceId: string): Observable<GpsLocationInterface[]> {
    return this.http.get<IGps[]>(this.url).pipe(
      map((data) => {
        const groupedData: GpsLocationInterface[] = data.reduce(
          (acc: any, item) => {
            if (item.device_id == deviceId) {
              if (!acc[item.location]) {
                acc[item.location] = {
                  location: item.location,
                  timestamp: [],
                };
              }
              if (!acc[item.location].timestamp.includes(item.timestamp)) {
                acc[item.location].timestamp.push(item.timestamp);
              }
            }
            return acc;
          },
          {}
        );
        return Object.values(groupedData);
      })
    );
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
