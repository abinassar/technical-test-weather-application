
export interface TimeZoneList {
  status: string;
  message: string;
  zones: Zone[];
}

export interface Zone {
  countryCode: string;
  countryName: string;
  zoneName: string;
  gmtOffset: number;
  timestamp: number;
}

export interface LocationTimeZone {
  status: string;
  message: string;
  countryCode: string;
  countryName: string;
  regionName: string;
  cityName: string;
  zoneName: string;
  abbreviation: string;
  gmtOffset: number;
  dst: string;
  zoneStart: number;
  zoneEnd: null;
  nextAbbreviation: null;
  timestamp: number;
  formatted: string;
}