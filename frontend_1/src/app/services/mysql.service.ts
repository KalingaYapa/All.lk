/**
 * Created by KalingaY on 5/20/2018.
 */

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import {Injectable} from "@angular/core";
import { environment } from './../../environments/environment';
import {GlobalService} from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseBody } from './response-body';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';



@Injectable()
export class MysqlService {
  loggedIn = false;

  constructor(
      public httpClient: HttpClient,
      private globalService: GlobalService,
      private router: Router,
      private jwtHelper: JwtHelperService,
  ) {
    this.loggedIn = this.isLoggedIn();
  }

  public signUp(username, email, password){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    return this.httpClient
        .post(
            this.globalService.apiHost + '/user/signup',
            JSON.stringify({
              SignupForm: {
                username: username,
                email: email,
                password: password
              }
            }),
            { headers: headers }
        ).pipe(map(response => {
          return response;
        })).catch(this.handleError);

  }

  public login(username, password) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    });

    return this.httpClient
        .post<ResponseBody>(
            this.globalService.apiHost + '/user/login',
            JSON.stringify({
              LoginForm: {
                username: username,
                password: password
              }
            }),
            {
              headers: headers
            }
        )
        .map(response => {
          if (response.success) {
            localStorage.setItem(
                environment.tokenName,
                response.access_token
            );
            this.loggedIn = true;
          } else {
            localStorage.removeItem(environment.tokenName);
            this.loggedIn = false;
          }
          return response;
        })
        .catch(this.handleError);
  }

  public logout(): void {
    localStorage.removeItem(environment.tokenName);
    this.loggedIn = false;
  }

  public isLoggedIn(): boolean {
    return this.jwtHelper.isTokenExpired() !== true;
  }

  private handleError(response: any) {
    let errorMessage: any = {};
    // Connection error
    if (response.error.status === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occurred. Please try again.'
      };
    } else {
      errorMessage = response.error;
    }

    return Observable.throw(errorMessage);
  }

  public unauthorizedAccess(error: any): void {
    this.logout();
    this.router.navigate(['/login']);
  }

}
