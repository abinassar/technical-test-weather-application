import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { LANGUAGE } from '@core/models';
import { LanguageService, LocalService, SessionService, TokenService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { TemplateSidenavComponent } from '@shared/components';
import { CONFIG_ROUTES } from '@core/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateModule,
    RouterModule,
    TemplateSidenavComponent
  ]
})
export class DashboardComponent {

  constructor(private languageService: LanguageService,
              private localService: LocalService,
              private sessionService: SessionService,
              private tokenService: TokenService,
              private router: Router
  ) {

  }

  changeLang(spanish: boolean) {
    this.languageService
        .setLanguage.next(spanish ? LANGUAGE.SPANISH : LANGUAGE.ENGLISH);
  }

  signOut() {
    this.localService.clearLocalData();
    this.sessionService.clearSessionData();
    this.tokenService.clearToken();
    this.router.navigate([CONFIG_ROUTES.SIGN]);
  }

}
