import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService, TokenService } from '../services';
import { CONFIG_ROUTES } from '../constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService,
              private router: Router,
              private translate: TranslateService,
              private toastService: ToastService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.tokenService.getToken()) {
      this.toastService.warning("NOT_AUTHORIZED");
      this.router.navigate([CONFIG_ROUTES.SIGN]).then();
      return false;
    } else {
      return true;
    }
  }

}
