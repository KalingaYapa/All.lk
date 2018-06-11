import { Component, OnInit } from '@angular/core';
import { User } from '../beans/user';
import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-alladds',
  templateUrl: './alladds.component.html',
  styleUrls: ['./alladds.component.css']
})

export class AlladdsComponent implements OnInit {
  usersMysql: User[];
  private loading: boolean = false;

  constructor(private _mysqlService: MysqlService) { }

  ngOnInit() {
    this.getUsersMysql();
  }

  private getUsersMysql() {

    this._mysqlService.getUserDetailsFromDB().subscribe( data => {
      this.loading = false;
      this.usersMysql = data
    });

  }
}
