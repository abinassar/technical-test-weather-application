import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import { SessionGuard } from './guards';
import {
  HttpRequestsResponseInterceptor,
  TokenInterceptor
} from './interceptors';
import {
  MODE_STORAGE_SERVICE,
  ThemeStorageService,
  ThemeToggleService,
  TokenService
} from './services';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CryptoService, 
         HttpService, 
         LoadingService, 
         LocalService, 
         SessionService, 
         ToastService } from '@core/services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    TokenService,
    SessionGuard,
    HttpService,
    LocalService,
    SessionService,
    ToastService,
    CryptoService,
    LoadingService,
    ThemeToggleService,
    TokenService,
    {
      provide: MODE_STORAGE_SERVICE,
      useClass: ThemeStorageService,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpRequestsResponseInterceptor, 
      multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
  ]
})
export class CoreModule {
}
