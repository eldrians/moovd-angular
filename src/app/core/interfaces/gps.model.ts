export interface IGps {
  device_id: string;
  device_type: string;
  timestamp: string;
  location: string;
}

export interface GpsInterface {
  device_id: string;
  device_type: string;
  location?: GpsLocationInterface[];
}

export interface GpsLocationInterface {
  location: string;
  timestamp?: string[];
}
