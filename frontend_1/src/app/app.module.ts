import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { MysqlService} from './services/mysql.service';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import {LoginService} from "./services/login.service";
import {GlobalService} from './services/global.service';
import { UserDataService } from './services/user-data.service';

import { environment } from './../environments/environment';
import { AuthGuard } from './services/auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
// Layouts
import { FrontendLayoutComponent } from './layout/frontend-layout.component';
import { P404Component } from './page/404.component';

export function tokenGetter() {
  return localStorage.getItem(environment.tokenName);
}

@NgModule({
  declarations: [
    AppComponent,
    FrontendLayoutComponent,
    P404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.apiHost]
      }
    })
  ],
  providers: [
    MysqlService,
    LoginService,
    GlobalService,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    },
    AuthGuard,
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
