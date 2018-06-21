import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MysqlService } from '../services/mysql.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend-layout.component.html',
  styleUrls: ['../../assets/bootstrap/css/bootstrap.css']
})
export class FrontendLayoutComponent implements OnInit {
  public userData: any = {};
  public today: Date;

  constructor(public mysqlService: MysqlService,
      private cdRef: ChangeDetectorRef) {
    this.today = new Date();

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    const jwtValue: any = this.mysqlService.getJWTValue();
    if (jwtValue !== null) {
      this.userData = jwtValue.data;
    }
  }
}
