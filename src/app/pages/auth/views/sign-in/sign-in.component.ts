import {
  Component,
  HostListener
} from '@angular/core';
import {
  FormControl, FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { fadeAnimation } from '@shared/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SignHeaderComponent } from '../../components/sign-header/sign-header.component';
import { SignFooterComponent } from '../../components';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CONFIG_ROUTES } from '@core/constants';
import { CryptoService, HttpService, LocalService, ToastService } from '@core/services';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: fadeAnimation,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SignHeaderComponent,
    SignFooterComponent,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  providers: [
    AuthService
  ]
})

export class SignInComponent {

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hidePassword = true;
  showSpinner = false;

  hello = this.translate.instant("NOT_AUTHORIZED")

  constructor(public auth: AuthService,
    private readonly router: Router,
    private toastService: ToastService,
    private localService: LocalService,
    private translate: TranslateService,
    private crypto: CryptoService) {
    this.localService.clearLocalStorage();
  }

  @HostListener('document:keydown.enter', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.signIn();
  }

  async signIn() {

    if (this.signInForm.valid) {

      const {
        email,
        password
      } = this.signInForm.value;

      this.showSpinner = true;
      let emailEcrypted = this.crypto.encryptUsingAES256(email);
      let passwordEcrypted = this.crypto.encryptUsingAES256(password);
      this.auth
          .signIn(email,
                  password)
          .subscribe((response) => {
            this.showSpinner = false;
            this.toastService.success('WELCOME')
            this.router.navigate([CONFIG_ROUTES.DASHBOARD]);
          }, (err) => {
            this.showSpinner = false;
            this.toastService.error('INCORRECT_CREDENTIALS')
          })
    }
  }

  goToRegister() {
    this.router.navigate([CONFIG_ROUTES.SIGN, CONFIG_ROUTES.REGISTER]);
  }

}
