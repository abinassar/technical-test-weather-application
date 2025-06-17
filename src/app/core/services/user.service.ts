import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '@environments/environment';
import { Observable, tap } from 'rxjs';
import { BodyUser, LoadingMessages, User, UserSession } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userUri = '/user';
  private sessionsUri = '/sessions';

  constructor(private http: HttpService
  ) {}

  registerUser(user: BodyUser) {

    return this.http
      .post(this.userUri, 
            environment.apiUrl,
            user, 
            null,
            true,
            true,).pipe(tap(response => !environment.production
                                        && console.log('register user: ', response)));
  }

  getUserInfo(email: string): Observable<User> {

    const params = {
      email
    }

    return this.http
      .get(this.userUri, 
            environment.apiUrl,
            params,
            true,
            true,
            LoadingMessages.GETTING_USER_INFO).pipe(tap(response => !environment.production
                                        && console.log('user info: ', response)));
  }

  updateUserInfo(user: BodyUser): Observable<User> {

    return this.http
      .patch(this.userUri, 
            environment.apiUrl,
            user, 
            null,
            true,
            true,
            LoadingMessages.UPDATING_USER).pipe(tap(response => !environment.production
                                        && console.log('update user info: ', response)));  
  }

  getUsers(): Observable<UserSession[]> {

    return this.http
      .get(this.sessionsUri, 
            environment.apiUrl,
            null,
            true,
            true,
          LoadingMessages.GETTING_USERS).pipe(tap(response => !environment.production
                                        && console.log('users: ', response)));
  }
  
}
