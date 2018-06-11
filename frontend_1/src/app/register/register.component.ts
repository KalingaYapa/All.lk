import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MysqlService } from '../services/mysql.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../assets/bootstrap/css/bootstrap.css']
})
export class RegisterComponent implements OnInit {
  clickMessage = '';
  submitted = false;
  registerForm = new FormGroup({
    email: new FormControl('', Validators.minLength(2)),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private _mysqlService: MysqlService) { }

  ngOnInit() {
  }

  onClickMe() {
    this.clickMessage = 'kalinga';
    alert(this.clickMessage );
  }

  onSubmit(user) {
    this.submitted = true;
    this.clickMessage = 'subbmitted';
    if(this._mysqlService.postUserDetailsToDB(this.registerForm.value)){
      console.log("User added");
    };
  }
}
