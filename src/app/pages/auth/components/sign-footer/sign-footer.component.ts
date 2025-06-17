import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { version } from '@core/constants';

@Component({
  selector: 'app-sign-footer',
  templateUrl: './sign-footer.component.html',
  styleUrls: ['./sign-footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class SignFooterComponent implements OnInit {
  today = new Date();
  year = this.today.getFullYear();
  version: string = version;

  constructor() {
  }

  ngOnInit(): void {
  }

}
