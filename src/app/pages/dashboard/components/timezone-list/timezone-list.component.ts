import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { LocationTimeZone, TimeZoneList, Zone } from '../../models';
import { TimezoneService } from '../../services';

@Component({
  selector: 'app-timezone-list',
  templateUrl: './timezone-list.component.html',
  styleUrls: ['./timezone-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule
  ]
})
export class TimezoneListComponent implements OnChanges {

  @Input() locationTimeZone: LocationTimeZone | null = null;
  @Input() timeZoneList: TimeZoneList | null = null;
  @Output() locationTime = new EventEmitter<string>()
  timeFormatted: string = 'No Seleccionada';

  constructor(private timeZoneService: TimezoneService) { }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['locationTimeZone']?.currentValue) {
      this.timeZoneList = null;
    }

    if (changes['timeZoneList']?.currentValue) {
      this.locationTimeZone = null;
    }
  }

  getTimeZone(zoneName: string | undefined) {

    if (!zoneName) return;

    this.locationTime.emit(zoneName);

  }

}
