import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError,
  map
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { CONFIG_ROUTES } from '@core/constants';
import { ToastService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpRequestsResponseInterceptor implements HttpInterceptor {

  constructor(private readonly ToastService: ToastService,
    private readonly router: Router,
    private translate: TranslateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.ToastService.warning("NOT_AUTHORIZED");
            this.router.navigate([CONFIG_ROUTES.SIGN]);
            break;
          case 403:
            this.ToastService.warning("NOT_AUTHORIZED");
            this.router.navigate([CONFIG_ROUTES.SIGN]);
            break;
          case 500:
            this.ToastService.error('Error de servidor.');
            break;
          case 502:
            this.ToastService.error('Error de servidor.');
            break;
        }
        return throwError(error);
      })
    );
  }

}
