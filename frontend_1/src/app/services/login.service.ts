import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import {promise} from "selenium-webdriver";
import {Observable} from "rxjs";
import {GlobalService} from './global.service'

@Injectable()
export class LoginService {
  // apiRoot: string = 'http://localhost:8080';

  constructor(
      private _http : Http,
      private globalService: GlobalService
  ) { }

  public logIn(object): boolean {
    let url: string = `${this.globalService.apiHost}/user/login`;
      this._http.post(url, object.value, {headers: new Headers({'Content-Type': 'application/json'})});
     return true;
  }

}
