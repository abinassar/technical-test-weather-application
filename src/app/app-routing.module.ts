import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG_ROUTES } from './core/constants';
import { SessionGuard } from './core/guards';

const routes: Routes = [
  {
    path: CONFIG_ROUTES.SIGN,
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: CONFIG_ROUTES.DASHBOARD,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [SessionGuard]
  },
  {
    path: '',
    redirectTo: CONFIG_ROUTES.DASHBOARD,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: CONFIG_ROUTES.DASHBOARD,
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
