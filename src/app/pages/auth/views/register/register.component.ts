import {
  Component,
  HostListener
} from '@angular/core';
import {
  FormBuilder,
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
import { CryptoService, LocalService, ToastService, UserService } from '@core/services';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services';
import { BodyUser, ROLE } from '@core/models';
import { matchValidator } from '@core/validators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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

export class RegisterComponent {

  registerForm: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required, 
                                   Validators.minLength(6),
                                   Validators.maxLength(16)]),
    confirmPassword: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email])
  },
  {
    validator: matchValidator('password', 'confirmPassword')
  }
);
  hidePassword = true;
  showSpinner = false;

  constructor(public auth: AuthService,
    private readonly router: Router,
    private toastService: ToastService,
    private localService: LocalService,
    private crypto: CryptoService,
    private fb: FormBuilder,
    private userService: UserService) {
    this.localService.clearLocalStorage();
  }

  @HostListener('document:keydown.enter', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
    this.registerUser();
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  async registerUser() {

    if (this.registerForm.valid) {

      const {
        name,
        password,
        email
      } = this.registerForm.value;

      this.showSpinner = true;
      // let userNameEcrypted = this.crypto.encryptUsingAES256(username);
      // let passwordEcrypted = this.crypto.encryptUsingAES256(password);

      const user: BodyUser = {
        email,
        name,
        password,
        role: ROLE.ADMINISTRATOR,
        tasks: '[]',
        countries: '[]'
      }

      this.userService
          .registerUser(user)
          .subscribe((response) => {
            this.showSpinner = false;
            this.toastService.success('USER_CREATED')
            this.router.navigate([CONFIG_ROUTES.SIGN]);
          }, (err) => {
            this.showSpinner = false;
            this.toastService.error(err.error);
          })
    }
  }

  goToSignIn() {
    this.router.navigate([CONFIG_ROUTES.SIGN]);
  }

}
