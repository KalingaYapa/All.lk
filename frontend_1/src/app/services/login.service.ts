import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import {promise} from "selenium-webdriver";
import {Observable} from "rxjs";
import {GlobalService} from './global.service'
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  // apiRoot: string = 'http://localhost:8080';

  constructor(
      private _http : Http,
      private globalService: GlobalService
  ) { }

  // public logIn(object): void {
  //   let url: string = `${this.globalService.apiHost}/user/test`;
  //      // this._http.get(url, object.value, {headers: new Headers({'Content-Type': 'application/json'})});
  //    this._http.get(url).pipe(map(res => {
  //     console.log(res);
  //   }));
  // }
}
