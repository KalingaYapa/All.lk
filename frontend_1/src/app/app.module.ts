import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostaddComponent } from './postadd/postadd.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { MysqlService} from './services/mysql.service';
import { AlladdsComponent } from './alladds/alladds.component';
import { FormsModule ,ReactiveFormsModule}   from '@angular/forms';
import {LoginService} from "./services/login.service";
import {GlobalService} from './services/global.service';



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
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MysqlService,LoginService,GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
