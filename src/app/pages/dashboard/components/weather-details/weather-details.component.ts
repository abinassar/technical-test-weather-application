import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationWeather } from '../../models';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class WeatherDetailsComponent implements OnInit {

  @Input() locationWeather!: LocationWeather;
  @Output() saveOnHistory = new EventEmitter<void>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  saveHistory() {
    this.saveOnHistory.emit();
  }

}
