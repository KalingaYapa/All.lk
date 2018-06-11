import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PostaddComponent } from './postadd/postadd.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {AlladdsComponent} from "./alladds/alladds.component";

const routes: Routes = [
  { path: 'postAdd', component: PostaddComponent },
  {path:'register',component: RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'mycart', component:CartComponent},
  {path:'allAdds', component:AlladdsComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
