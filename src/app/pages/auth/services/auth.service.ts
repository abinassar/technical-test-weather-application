import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { LoadingMessages } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signInUri = '/auth/authenticate';
  private userUri = '/user';

  constructor(private http: HttpService
  ) {}

  signIn(username: string,
         password: string) {

    return this.http
      .post(this.signInUri, 
            environment.apiUrl, 
            {
              username,
              password,
            }, 
            null,
            true,
            true,).pipe(tap(response => !environment.production
                                        && console.log('sign-in: ', response)));
  }

}
