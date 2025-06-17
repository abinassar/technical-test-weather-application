import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenService} from '../services/token.service';
import {catchError, finalize, map} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  requestToken: string = '';

  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;

    request = this.tokenService.getToken() ?
              this.setAuthHeader(req.clone()) :
              req.clone();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body) {

            if ('jwt' in event.body) {
              this.tokenService.clearToken();
              this.tokenService.saveToken(event.body.jwt);
            }
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => {
      })
    );
  }

  setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {

    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.requestToken
      }
    });
  }
}
