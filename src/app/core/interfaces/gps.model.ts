export interface IGps {
  device_id: string;
  device_type: string;
  timestamp: string;
  location: string;
}

export interface ListGpsInterface {
  device_id: string;
  device_type: string;
}

export interface DetailGpsInterface {
  device_id: string;
  device_type: string;
  device_location: LocationGpsInterface[];
  totalTimeSpent: number;
}

export interface LocationGpsInterface {
  location: string;
  timestamp: string[];
  totalTimestamp: number;
}
