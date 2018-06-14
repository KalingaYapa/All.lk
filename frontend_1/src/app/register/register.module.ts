import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {RegisterComponent} from "./register.component";
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule

  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
