import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { APP_NAME } from '@core/constants';

@Component({
  selector: 'app-sign-header',
  templateUrl: './sign-header.component.html',
  styleUrls: ['./sign-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule
  ]
})
export class SignHeaderComponent {

  appName: string = APP_NAME

}
