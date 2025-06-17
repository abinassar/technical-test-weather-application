import { Injectable } from '@angular/core';
import { HttpService, LanguageService } from '@core/services';
import { map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { City, LocationWeather } from '../models';
import { environment } from '@environments/environment';
import { LoadingMessages } from '@core/models';

@Injectable()
export class WeatherService {

  setFavorite: Subject<LocationWeather> = new Subject();
  setFavorite$ = this.setFavorite.asObservable();

  constructor(private http: HttpService,
              private languageService: LanguageService) { }

  getWeather(locationClue: string): Observable<LocationWeather> {

    let params = {
      q: locationClue,
      key: environment.weatherAPIKey,
      lang: this.languageService.language
    };

    return this.http
               .get("/current.json",
                    environment.weatherUrl,
                    params,
                    true,
                    true,
                    LoadingMessages.GETTING_WEATHER_INFO)
               .pipe(map((response) => response),
                     tap(response => 
                        !environment.production 
                        && console.log('getLocation: ', response))
                     );

  }

  searchCity(locationClue: string): Observable<City[]> {

    let params = {
      q: locationClue,
      key: environment.weatherAPIKey
    };

    return this.http
               .get("/search.json",
                    environment.weatherUrl,
                    params,
                    false)
               .pipe(map((response) => response),
                     tap(response => 
                        !environment.production
                        && console.log('searchCity: ', response)),
                     shareReplay(30)
                     );

  }

}
