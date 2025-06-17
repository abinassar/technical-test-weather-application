import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { DateFormatterModule } from '@shared/pipes/date-formatter/date-formatter.module';

@Component({
  selector: 'app-location-time',
  templateUrl: './location-time.component.html',
  styleUrls: ['./location-time.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    DateFormatterModule,
    TranslateModule
  ]
})
export class LocationTimeComponent implements OnInit {

  @Input() locationTime: string = 'SELECT_A_LOCATION';
  @Input() locationZoneName: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
