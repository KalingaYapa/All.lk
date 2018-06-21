import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashbordComponent} from "./dashbord.component";
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    data: {
      title: 'DashBoard'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
