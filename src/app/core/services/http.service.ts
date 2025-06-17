import {
  Inject,
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Observable,
  Subject,
  forkJoin,
  lastValueFrom
} from 'rxjs';
import {
  finalize,
  retry,
  take,
  takeUntil
} from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { LoadingMessages } from '../models';
import { environment } from '@environments/environment';

@Injectable()
export class HttpService {

  cancelHttpCall: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient,
    private loadingService: LoadingService) {
  }

  get(uri: string,
      baseUrl: string = environment.weatherUrl,
      params?: any,
      startLoading = true,
      closeLoading = true,
      message = LoadingMessages.DEFAULT,
      headers: HttpHeaders = new HttpHeaders({
        Accept: 'application/json'
      })): Observable<any> {

    const requestParams: HttpParams = this.getHttpParams(params);

    if (startLoading) {
      this.loadingService.startLoading(message);
    }

    return this.http.get<any>(baseUrl + uri, {headers, params: requestParams})
      .pipe(
        finalize(() => {
          if (closeLoading) {
            this.loadingService.stopLoading();
          }
        })
      );
  }

  post(uri: string,
    baseUrl: string = environment.weatherUrl,
    body: any = {},
    params?: any,
    startLoading = true,
    closeLoading = true,
    message: string = LoadingMessages.DEFAULT,
    headers: HttpHeaders = new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })): Observable<any> {

    const requestParams: HttpParams = this.getHttpParams(params);

    if (startLoading) {
      this.loadingService.startLoading(message);
    }

    let url = baseUrl + uri;

    return this.http.post<any>(
      url,
      headers.get('Content-Type') !== 'application/x-www-form-urlencoded' ? JSON.stringify(body) : body,
      { headers, params: requestParams })
      .pipe(
        takeUntil(this.cancelHttpCall),
        finalize(() => {
          if (closeLoading) {
            this.loadingService.stopLoading();
          }
        })
      );
  }

  patch(uri: string,
    baseUrl: string = environment.weatherUrl,
    body: any = {},
    params?: any,
    startLoading = true,
    closeLoading = true,
    message: string = LoadingMessages.DEFAULT,
    headers: HttpHeaders = new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' })): Observable<any> {

    const requestParams: HttpParams = this.getHttpParams(params);

    if (startLoading) {
      this.loadingService.startLoading(message);
    }

    let url = baseUrl + uri;

    return this.http.patch<any>(
      url,
      headers.get('Content-Type') !== 'application/x-www-form-urlencoded' ? JSON.stringify(body) : body,
      { headers, params: requestParams })
      .pipe(
        takeUntil(this.cancelHttpCall),
        finalize(() => {
          if (closeLoading) {
            this.loadingService.stopLoading();
          }
        })
      );
  }

  getHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }
}
