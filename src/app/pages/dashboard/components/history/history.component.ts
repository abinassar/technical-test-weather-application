import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocationData, LocationWeather } from '../../models';
import { ToastService } from '@core/services';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { defaultHistory } from '../../constants/history';
import { TimezoneService } from '../../services';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class HistoryComponent {


  columns: string[] = [
    "CITY",
    "REGION",
    "COUNTRY"
  ];
  rowTags: string[] = [
    "city",
    "region",
    "country"
  ];
  @Input() historyLocationRecords: LocationWeather [] = [];
  noLocation: string = 'assets/icons/no_location.svg';

  @Output() locationWeather = new EventEmitter<LocationWeather>(); 
  @Output() timeZoneId = new EventEmitter<string>(); 
  @Output() timeZoneCountryId = new EventEmitter<string>(); 
  @Output() getLocationWeather = new EventEmitter<LocationData>();

  constructor(private weatherService: WeatherService,
              private timeZoneService: TimezoneService,
              private translate: TranslateService,
              private toastService: ToastService) {
    const localHistory = localStorage.getItem('history');
    if (localHistory) {
      this.historyLocationRecords = JSON.parse(localHistory);
    }
  }

  deleteFav(index: number) {
    this.historyLocationRecords = this.removeElementByIndex(this.historyLocationRecords, index);
    localStorage.setItem('history', JSON.stringify(this.historyLocationRecords));
  }

  getLocationData(location: LocationWeather) {

    const locationData: LocationData = {
      zoneName: location.countryCode ?
                location.countryCode :
                location.location.tz_id,
      location,
      getTimeZoneList: location.countryCode ? 
                       true :
                       false
    }

    this.getLocationWeather.emit(locationData);

    // if (location.countryCode) {
    //   this.timeZoneCountryId.emit(location.countryCode);
    // } else {
    //   this.timeZoneId.emit(location.location.tz_id)
    // }

    // this.locationWeather.emit(location);

  }

  removeElementByIndex<T>(array: T[], index: number): T[] {

    // Check if the index is valid

    if (index >= 0 && index < array.length) {

      // Remove the element at the specified index
      
      array.splice(index, 1);
    } else {
      console.warn(`Index ${index} is out of range. No element was removed.`);
    }
  
    // Return the modified array
    return array;
  }

}
