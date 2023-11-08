import {
  IGps,
  ListGpsInterface,
  DetailGpsInterface,
  LocationGpsInterface,
} from '../../../app/core/interfaces';

describe('IGps', () => {
  it('should define the IGps interface', () => {
    const gpsData: IGps = {
      device_id: 'D-1567',
      device_type: 'Asset',
      timestamp: '31-08-2022 10.29',
      location: 'L1',
    };

    expect(gpsData).toBeDefined();
    expect(gpsData.device_id).toBe('D-1567');
    expect(gpsData.device_type).toBe('Asset');
    expect(gpsData.timestamp).toBe('31-08-2022 10.29');
    expect(gpsData.location).toBe('L1');
  });
});

describe('ListGpsInterface', () => {
  it('should define the ListGps Interface', () => {
    const listGpsData: ListGpsInterface = {
      device_id: 'D-1567',
      device_type: 'Asset',
    };

    expect(listGpsData).toBeDefined();
    expect(listGpsData.device_id).toBe('D-1567');
    expect(listGpsData.device_type).toBe('Asset');
  });
});

describe('DetailGpsInterface', () => {
  it('should define the DetailGpsInterface', () => {
    const detailGpsData: DetailGpsInterface = {
      device_id: 'D-1567',
      device_type: 'Asset',
      device_location: [],
      totalTimeSpent: 25,
    };

    expect(detailGpsData).toBeDefined();
    expect(detailGpsData.device_id).toBe('D-1567');
    expect(detailGpsData.device_type).toBe('Asset');
    expect(detailGpsData.device_location).toEqual([]);
    expect(detailGpsData.totalTimeSpent).toBe(25);
  });
});

describe('LocationGpsInterface', () => {
  it('should define the LocationGpsInterface', () => {
    const locationGpsData: LocationGpsInterface = {
      location: 'Sample Location',
      timestamp: [],
      totalTimestamp: 0,
    };

    expect(locationGpsData).toBeDefined();
    expect(locationGpsData.location).toBe('Sample Location');
    expect(locationGpsData.timestamp).toEqual([]);
    expect(locationGpsData.totalTimestamp).toBe(0);
  });
});
