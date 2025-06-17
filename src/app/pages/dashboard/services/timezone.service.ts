import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';
import { LocationTimeZone, TimeZoneList } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {

  listTimeZone: string = '/list-time-zone';

  constructor(private httpClient: HttpClient
  ) { }

  
  /**
   * IMPORTANT
   * For this endpoint and the getTimeZone
   * Endpoint we use the proxy in proxy.conf.json
   * File configured in Angular.json file
   * To prevent the CORS block from the timezonedb API
   * 
   * @param {string} countryCode 
   * @returns {Observable<any>} 
   * 
   * @memberOf TimezoneService
   */
  getTimeZoneList(countryCode: string): Observable<TimeZoneList> {
    return this.httpClient
               .get<TimeZoneList>(`/tz/v2.1/list-time-zone?key=${environment.timezoneAPIKey}&format=json&country=${countryCode}`)
  }

  getTimeZone(zoneId: string): Observable<LocationTimeZone> {
    return this.httpClient
               .get<LocationTimeZone>(`/tz/v2.1/get-time-zone?key=${environment.timezoneAPIKey}&format=json&by=zone&zone=${zoneId}`)
  }

}
