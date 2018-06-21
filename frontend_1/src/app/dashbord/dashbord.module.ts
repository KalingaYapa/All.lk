import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashbordRoutingModule} from "./dashbord-routing.module";
import {SharedModule} from "../shared/shared.module";
import {DashbordComponent} from "./dashbord.component";

@NgModule({
  imports: [
    CommonModule,
    DashbordRoutingModule,
    SharedModule
  ],
  declarations: [DashbordComponent]
})
export class DashbordModule { }
