import { Injectable } from '@angular/core';
import { LANGUAGE } from '@core/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  _language: LANGUAGE = LANGUAGE.SPANISH;
  setLanguage: Subject<LANGUAGE> = new Subject();
  setLanguage$ = this.setLanguage.asObservable();

  constructor() { }

  set language(language: LANGUAGE) {
    this._language = language;
  }

  get language(): LANGUAGE {
    return this._language;
  }
}
