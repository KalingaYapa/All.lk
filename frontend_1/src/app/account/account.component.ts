import { Component, OnInit } from '@angular/core';
import { MysqlService } from '../services/mysql.service';
import { User } from '../services/user';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  errorMessage: string;

  mode: string = '';
  user: User;

  constructor(
      private mysqlService: MysqlService,
      private userDataService: UserDataService
  ) {
  }

  public ngOnInit() {
    this.errorMessage = '';
    this.userDataService.getMe().subscribe(
        user => {
          this.user = user;
          this.mode = 'view';
        },
        error => {
          // unauthorized access
          if (error.status === 401 || error.status === 403) {
            this.mysqlService.unauthorizedAccess(error);
          } else {
            this.errorMessage = error.data.message;
          }
        }
    );
  }
}
