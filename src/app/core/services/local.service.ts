import { Injectable, InjectionToken } from '@angular/core';
import { CryptoService } from './crypto.service';
import { KEYS_PREFIX, TOKEN_KEY } from '../constants';

export const LOCAL_PREFIX = new InjectionToken<string>('localPrefix');
export const LOCAL_TOKEN_KEY = new InjectionToken<string>('tokenKey');
export const LOCAL_USERNAME_KEY = new InjectionToken<string>('userNameKey');

@Injectable()
export class LocalService {

  sessionPrefix: string = KEYS_PREFIX;
  tokenKey: string = TOKEN_KEY;

  constructor(private crypto: CryptoService) { }

  /**
   * Set encrypted key to session storage
   *
   * @param {string} key
   * @param {*} value
   * @memberof LocalService
   */
  setItem(key: string, value: any, encrypt: boolean = true) {
    const fullKey = this.sessionPrefix + key;
    const stringValue = JSON.stringify(value);
    localStorage.setItem(encrypt ? this.crypto.encryptUsingAES256(fullKey) : fullKey,
      encrypt ? this.crypto.encryptUsingAES256(stringValue) : stringValue);
  }

  /**
   * Get encrypted key from session storage
   *
   * @param {string} key
   * @return {*} 
   * @memberof LocalService
   */
  getItem(key: string,
    encryptedKey: boolean = true,
    encryptedValue: boolean = true): any | null {

    const fullKey = this.sessionPrefix + key;
    const value =
      localStorage.getItem(encryptedKey ?
        this.crypto.encryptUsingAES256(fullKey) :
        fullKey) ?? '';

    const sessionValue = encryptedValue ?
      this.crypto.decryptUsingAES256(value) :
      value;

    return sessionValue !== '' ?
      JSON.parse(sessionValue) :
      null;
  }

  /**
   * Remove encrypted key on session storage
   *
   * @param {string} key
   * @return {*} 
   * @memberof LocalService
   */
  removeItem(key: string,
    encryptedKey: boolean = true) {
    const fullKey = this.sessionPrefix + key;
    return localStorage.removeItem(encryptedKey ?
      this.crypto.encryptUsingAES256(fullKey) :
      fullKey);
  }
  
  /**
   * Clear all keys that have the session prefix
   * 
   * @memberOf SessionService
   */
  clearLocalData(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.sessionPrefix))
      .forEach(key => localStorage.removeItem(key));
  }

  clearLocalStorage() {
    localStorage.removeItem(this.tokenKey);
    this.clearLocalData();
  }
}
