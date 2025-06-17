import { Component } from '@angular/core';
import { LANGUAGE, LoadingMessages, Mode } from '@core/models';
import { LanguageService, LoadingService, ThemeToggleService } from '@core/services';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'farmago-test';
  currentMode: Mode = Mode.LIGHT;
  themeSubscriptor = this.themeService
                         .modeChanged$
                         .subscribe((mode: Mode) => {
    this.currentMode = mode;
  });

  langKey: string = 'weather-lang';
  languageSub: Subscription = this.languageService
                                  .setLanguage$
                                  .subscribe(lang => this.changeLanguage(lang));

  loadingObservable = this.loadingService.loadingStatusObs.subscribe((startLoading) => {
    return (startLoading) ? 
           this.spinner.show('full-screen-spinner') : 
           this.spinner.hide('full-screen-spinner');
  });

  constructor(private themeService: ThemeToggleService,
              private languageService: LanguageService,
              private spinner: NgxSpinnerService,
              public loadingService: LoadingService,
              private translate: TranslateService) {
    const lang = localStorage.getItem(this.langKey) || 'es';
    translate.use(lang);
  }

  toggle() {
    this.themeService.toggleMode();
  }

  changeLanguage(language: LANGUAGE) {
    localStorage.setItem(this.langKey, language);
    this.languageService.language = language;
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    this.languageSub.unsubscribe();
  }
}
