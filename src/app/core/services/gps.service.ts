import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { DetailGpsInterface, IGps, ListGpsInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GpsService {
  private baseUrl = 'http://localhost:3001';
  constructor(private http: HttpClient) {}

  getGpsLists(): Observable<ListGpsInterface[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<IGps[]>(`${this.baseUrl}/gps`, { headers }).pipe(
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

  getGpsDetail(deviceId: string): Observable<DetailGpsInterface[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<IGps[]>(`${this.baseUrl}/gps`, { headers }).pipe(
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
    const date = timestamps.map((timestamp) => {
      const parts = timestamp.split(' ');
      const dateParts = parts[0].split('-');
      const timeParts = parts[1].split('.');

      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[0]);
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);

      return new Date(year, month, day, hours, minutes);
    });

    let totalTimeSpent = 5; // start with 5

    for (let i = 1; i < date.length; i++) {
      const timeDifference = date[i].getTime() - date[i - 1].getTime();
      const timeSpentInMinutes = timeDifference / (1000 * 60);
      totalTimeSpent += timeSpentInMinutes;
    }
    return totalTimeSpent;
  }
}
