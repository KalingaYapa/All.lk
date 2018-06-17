import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GlobalService } from './global.service';
import { User } from './user';
import { MysqlService } from './mysql.service';
import { ResponseBody } from './response-body';

@Injectable()
export class UserDataService {
  constructor(
      private globalService: GlobalService,
      private mysqlService: MysqlService,
      private http: HttpClient
  ) {
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.mysqlService.getToken()
    });
  }

  // GET /v1/user/me
  getMe(): Observable<User> {
    const headers = this.getHeaders();

    return this.http
               .get(this.globalService.apiHost + '/user/me', {
                 headers: headers
               })
               .map(response => {
                 return <User>response;
               })
               .catch(this.handleError);
  }

  updateUser(userData): Observable<any> {
    const headers = this.getHeaders();

    return this.http
               .post<ResponseBody>(
                   this.globalService.apiHost + '/user/me',
                   JSON.stringify({
                     UserEditForm: userData
                   }),
                   { headers: headers }
               )
               .map(response => {
                 if (response.success) {
                 } else {
                 }
                 return response;
               })
               .catch(this.handleError);
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
}
