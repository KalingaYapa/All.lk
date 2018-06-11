import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../assets/bootstrap/css/bootstrap.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService : LoginService) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  loginUser() : void {
    console.log(this._loginService.logIn(this.loginForm));
  }
}
