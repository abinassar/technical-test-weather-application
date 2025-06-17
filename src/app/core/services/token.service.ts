import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY } from '../constants';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private newTokenSub = new Subject();
  newToken$ = this.newTokenSub.asObservable();

  constructor(private sessionService: SessionService) {
  }

  get userName(): string {
    return this.decodeToken().unique_name ?? 'No user';
  }

  decodeToken() {
    if (!this.getToken()) return null;
    return new JwtHelperService().decodeToken(this.getToken() as string);
  }

  saveToken(token: string) {
    this.sessionService.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    const token = this.sessionService.getItem(TOKEN_KEY) || null;
    return token;
  }

  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}
