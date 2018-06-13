import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { PostaddComponent } from './postadd/postadd.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { MysqlService} from './services/mysql.service';
import { AlladdsComponent } from './alladds/alladds.component';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import {LoginService} from "./services/login.service";
import {GlobalService} from './services/global.service';
import { environment } from './../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem(environment.tokenName);
}

@NgModule({
  declarations: [
    AppComponent,
    PostaddComponent,
    RegisterComponent,
    CartComponent,
    LoginComponent,
    AlladdsComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
