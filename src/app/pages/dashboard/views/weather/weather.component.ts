import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService, LoadingService, ToastService, TokenService, UserService } from '@core/services';
import { BodyUser, 
         LoadingMessages, 
         PendingTask, 
         ROLE } from '@core/models';
import { LocationData, LocationTimeZone, LocationWeather, TimeZoneList } from '../../models';
import { TimezoneService, WeatherService } from '../../services';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { defaultHistory } from '../../constants';
import { TimezoneListComponent,
         PendingTasksComponent,
         LocationTimeComponent,
         HistoryComponent,
         WeatherDetailsComponent } from '../../components';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    WeatherDetailsComponent,
    HistoryComponent,
    FlexLayoutModule,
    TranslateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    TimezoneListComponent,
    LocationTimeComponent,
    PendingTasksComponent
]
})
export class WeatherComponent implements OnInit {

  // Variables de busqueda

  weatherForm: FormGroup = this.fb.group({
    searchInput: ['']
  });
  citiesOptions: string[] = [];
  filteredCitiesOptions!: string[];
  gettingTypeAhead: boolean = false;
  locationWeather!: LocationWeather;
  historyLocationRecords: LocationWeather [] = [];
  timeZoneList!: TimeZoneList;
  locationTimeZone!: LocationTimeZone;
  locationTime: string = 'SELECT_A_LOCATION';
  locationZoneName: string = '';
  pendingTasks: PendingTask[] = [];

  constructor(private fb: FormBuilder,
              private weatherService: WeatherService,
              private loadingService: LoadingService,
              private userService: UserService,
              private tokenService: TokenService,
              private timeZoneService: TimezoneService,
              private toastService: ToastService) { }

  get searchClue() {
    return this.weatherForm.get('searchInput')?.value ?? '';
  }

  ngOnInit(): void {

    this.weatherForm
        .get('searchInput')
        ?.valueChanges
        .subscribe(searchClue => {

          this.gettingTypeAhead = true;
          this.weatherService
              .searchCity(searchClue)
              .subscribe((resp) => {
                this.citiesOptions = resp.map(city => city.name);
                this.filteredCitiesOptions = this.filterCity(searchClue || '');
              }, (error) => {

              }, () => this.gettingTypeAhead = false);

        });

    this.getUser();

  }

  getUser() {

    this.userService
        .getUserInfo(this.tokenService.decodeToken().email)
        .subscribe((info) => {

          this.historyLocationRecords = (JSON.parse(info.countries) as LocationWeather[]).length === 0 ?
                                        defaultHistory :
                                        JSON.parse(info.countries) as LocationWeather[]

          this.pendingTasks = JSON.parse(info.tasks);                                      
        });

  }

  private filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.citiesOptions.filter(citiesOption => citiesOption.toLowerCase().includes(filterValue));
  }

  searchWeather(searchClue: string = this.searchClue) {

    this.weatherService
        .getWeather(searchClue)
        .subscribe((weather) => {
          this.locationWeather = weather;
        });

  }

  updateUser() {

    const userData: BodyUser = {
      name: this.tokenService.decodeToken().name,
      email: this.tokenService.decodeToken().email,
      role: ROLE.ADMINISTRATOR,
      password: "",
      tasks: JSON.stringify(this.pendingTasks),
      countries: JSON.stringify(this.historyLocationRecords)
    };

    this.userService
        .updateUserInfo(userData)
        .subscribe((response) => {
          this.toastService.success("USER_UPDATED_SUCCESSFULLY");
        }, (err) => {
          this.toastService.error("ERROR_UPDATING_USER");
        })

  }

  getLocationWeather(location: LocationWeather) {
    this.searchWeather(location.location.name);
  }

  getLocationTimeZone(timeZoneId: string) {

    this.loadingService.startLoading(LoadingMessages.GETTING_TIME_ZONES);
    this.timeZoneService
        .getTimeZone(timeZoneId)
        .subscribe((timeZone) => {
          this.locationTime = timeZone.formatted;
          this.locationZoneName = timeZoneId;
          this.loadingService.stopLoading();
        },
        (err) => {
          this.toastService.error('ERROR_GETTING_LOCATION_TIMEZONE')
          this.loadingService.stopLoading();
        });
    
  }

  async getLocationData(locationData: LocationData) {

    try {
      
      this.loadingService.startLoading(LoadingMessages.GETTING_TIME_ZONES);

      const getTimeZoneReq: any = locationData.getTimeZoneList ?
                             this.timeZoneService
                                 .getTimeZoneList(locationData.zoneName) :
                             this.timeZoneService
                                 .getTimeZone(locationData.zoneName);
  
      const getTimeZoneRes: any = await lastValueFrom(getTimeZoneReq);

      this.loadingService.stopLoading();

      if (locationData.getTimeZoneList) {
        this.timeZoneList = getTimeZoneRes
      } else {
        this.locationTimeZone = getTimeZoneRes;
        this.locationTime = getTimeZoneRes.formatted;
        this.locationZoneName = locationData.zoneName;
      }
        
    } catch (error) {
      this.loadingService.stopLoading();
      this.toastService.error('ERROR_GETTING_LOCATION_TIMEZONE');
    }

    this.searchWeather(locationData.location.location.name);

  }

  saveOnHistory() {
    
    const historyFound = this.historyLocationRecords.find(record => record.location.name === this.locationWeather.location.name);
    
    if (!historyFound) {
      this.locationWeather.defaultRecord = false;
      const newData = new Set([...this.historyLocationRecords, ...[this.locationWeather]]);
      this.historyLocationRecords = Array.from(newData);
    }
  
  }

}
