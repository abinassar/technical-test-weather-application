import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './views/weather/weather.component';
import { RouterModule, Routes } from '@angular/router';
import { WeatherService } from './services';
import { TimezoneListComponent } from './components/timezone-list/timezone-list.component';
import { LocationTimeComponent } from './components/location-time/location-time.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { UsersComponent } from './views/users/users.component';
import { DashboardComponent } from './dashboard.component';
import { CONFIG_ROUTES } from '@core/constants';
import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: CONFIG_ROUTES.WEATHER,
        component: WeatherComponent,
      },
      {
        path: CONFIG_ROUTES.USERS,
        component: UsersComponent,
      },
      {
        path: '**',
        redirectTo: CONFIG_ROUTES.WEATHER,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    WeatherService
  ]
})
export class DashboardModule { }
