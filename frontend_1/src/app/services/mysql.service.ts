/**
 * Created by KalingaY on 5/20/2018.
 */
import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from "../beans/user";
import {Http, Headers} from '@angular/http';
import {GlobalService} from './global.service'


@Injectable()
export class MysqlService {
  // apiRoot: string = 'http://localhost:8080/api/v1';

  constructor(
      public http: Http,
      private globalService: GlobalService
  ) {
  }

  getUserDetailsFromDB(): Observable<User[]> {
    let apiURL = `${this.globalService.apiHost}/user/view`;
    return this.http.get(apiURL).pipe(map(res => {
      return res.json()
    }));

  }

  postUserDetailsToDB(Object) : boolean {
    let headers = new Headers();
    let apiURL = `${this.globalService.apiHost}/user/create`;
    this.http.post(apiURL, JSON.stringify(Object), {headers: new Headers({'Content-Type': 'application/json'})}).subscribe(
      res => console.log(res.json())
    );
    return true;
  }

}
