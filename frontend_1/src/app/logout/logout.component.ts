import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-logout',
  template: '<strong>Logging out...</strong>'
})
export class LogoutComponent implements OnInit {
  public submitted: boolean = false;
  public error: string = '';

  constructor(private mysqlService: MysqlService, private router: Router) {
  }

  ngOnInit() {
    this.mysqlService.logout();
    this.router.navigate(['/']);
  }
}
