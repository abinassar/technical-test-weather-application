import { Injectable } from '@angular/core';
import { LoadingMessages } from '../models';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {

  private loading = false;
  loadingStatus: Subject<boolean> = new Subject();
  loadingStatusObs = this.loadingStatus.asObservable();
  loadFromInterceptor = true;
  loadingMessage: LoadingMessages | string = LoadingMessages.DEFAULT;
  cancelButton = false;
  iconColor: string = '#ffff';

  constructor() { }

  Loading(value: boolean = true,
    message: string = LoadingMessages.DEFAULT,
    cancelButton: boolean = false,
    iconColor: string = '#ffff') {
    this.loadingMessage = message;
    this.cancelButton = cancelButton;
    this.iconColor = iconColor;
    this.loading = value;
    this.loadingStatus.next(value);
  }

  startLoading(message: string = LoadingMessages.DEFAULT,
    iconColor = '#ffff',
    cancelButton: boolean = false): void {
    this.Loading(true, message, cancelButton, iconColor);
  }

  stopLoading(): void {
    this.Loading(false);
  }

}
