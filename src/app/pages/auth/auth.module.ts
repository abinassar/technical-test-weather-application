import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { CONFIG_ROUTES } from '@core/constants';

const routes: Routes = [
  {
    path: CONFIG_ROUTES.SIGN_IN,
    component: SignInComponent,
  },
  {
    path: CONFIG_ROUTES.REGISTER,
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: CONFIG_ROUTES.SIGN_IN,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class AuthModule { }
