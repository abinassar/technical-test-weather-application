import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '@core/services';
import { TranslateModule } from '@ngx-translate/core';
import { TemplateTableComponent } from '@shared/components';
import { DateService } from '@shared/services';
import { NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    TemplateTableComponent,
    TranslateModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [
    NgxMaskService,
    DateService
  ]
})
export class UsersComponent implements OnInit {

  tableColumnsToDisplay: string[] = [
    "NAME",
    "EMAIL",
    "REGISTER_DATE",
    "LAST_LOGIN"
  ];
  tableColumnsTags: string[] = [
    "name",
    "email",
    "registrationDate",
    "lastLogin"
  ];
  tableData: any[] = [];
  
  constructor(private userService: UserService,
              private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {

    this.tableData = [];

    this.userService
        .getUsers()
        .subscribe((users) => {

          const userData = users.map((user) => {
            user.lastLogin = this.dateService.formatDate(user.lastLogin);
            user.registrationDate = this.dateService.formatDate(user.registrationDate);
            return user;
          });

          this.tableData = userData;

        });

  }

}
