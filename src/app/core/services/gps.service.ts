import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  DetailGpsInterface,
  IGps,
  ListGpsInterface,
} from '../interfaces/gps.model';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  url: string = '/assets/gps_data.json';
  constructor(private http: HttpClient) {}

  getGpsLists(): Observable<ListGpsInterface[]> {
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

  getGpsData(): Observable<IGps[]> {
    return this.http.get<IGps[]>(this.url);
  }

  getGpsDetail(deviceId: string): Observable<DetailGpsInterface[]> {
    return this.http.get<IGps[]>(this.url).pipe(
      map((data) => {
        const groupedData: Map<string, DetailGpsInterface> = data.reduce(
          (acc, item) => {
            if (item.device_id === deviceId) {
              const key = `${item.device_id}-${item.device_type}`;
              if (!acc.has(key)) {
                acc.set(key, {
                  device_id: item.device_id,
                  device_type: item.device_type,
                  device_location: [],
                  totalTimeSpent: 0,
                });
              }

              const entry = acc.get(key);
              const locationKey = item.location;

              if (!entry) {
                return acc;
              }

              if (
                !entry.device_location.some(
                  (loc) => loc.location === locationKey
                )
              ) {
                entry.device_location.push({
                  location: locationKey,
                  timestamp: [],
                  totalTimestamp: 0,
                });
              }

              const location = entry.device_location.find(
                (loc) => loc.location === locationKey
              );

              if (location) {
                location.timestamp.push(item.timestamp);
              }
            }
            return acc;
          },
          new Map<string, DetailGpsInterface>()
        );

        const result: DetailGpsInterface[] = Array.from(groupedData.values());
        result.forEach((entry) => {
          entry.device_location.forEach((location) => {
            location.totalTimestamp = this.calculateTimeSpent(
              location.timestamp
            );
          });
          entry.totalTimeSpent = entry.device_location.reduce(
            (total, loc) => total + loc.totalTimestamp,
            0
          );
        });

        return result;
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
