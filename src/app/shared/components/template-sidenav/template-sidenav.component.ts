import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {
  CommonModule,
  Location,
} from '@angular/common';
import { Router } from '@angular/router';
import { CONFIG_ROUTES } from '@core/constants';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-template-sidenav',
  templateUrl: './template-sidenav.component.html',
  styleUrls: ['./template-sidenav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    TranslateModule
  ]
})
export class TemplateSidenavComponent implements OnInit {
  @Input() menuItems: any[] = [
    {
      path: 'dashboard',
      title: 'HOME',
      icon: 'dashboard',
      childrenLinks: [
        {
          path: CONFIG_ROUTES.WEATHER,
          title: this.translate.instant('WEATHER'),
        },
        {
          path: CONFIG_ROUTES.USERS,
          title: this.translate.instant('USERS'),
        }
      ],
    }
  ];

  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    location: Location,
    private translate: TranslateService,
    private router: Router
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {}

  navigate(paths: string[]) {
    let pathArray: string[] = [];
    for (let index = 0; index < paths.length; index++) {
      pathArray.push(paths[index]);
    }
    this.router.navigate(pathArray);
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path) ? true : false;
  }
}
