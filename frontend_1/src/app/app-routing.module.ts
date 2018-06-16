import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './services/auth.guard';
import { PostaddComponent } from './postadd/postadd.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CartComponent} from "./cart/cart.component";
import {AlladdsComponent} from "./alladds/alladds.component";

import { FrontendLayoutComponent } from './layout/frontend-layout.component';
import { P404Component } from './page/404.component';

// const routes: Routes = [
//   { path: 'postAdd', component: PostaddComponent },
//   {path:'register',component: RegisterComponent},
//   {path:'login', component:LoginComponent},
//   {path:'mycart', component:CartComponent},
//   {path:'allAdds', component:AlladdsComponent}
// ];
export const routes: Routes = [
  {
    path: '',
    component: FrontendLayoutComponent,
    pathMatch: 'full',
    loadChildren: './index/index.module#IndexModule'
  },
  // {
  //   path: '',
  //   component: FrontendLayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'account',
  //       loadChildren: './app/account/account.module#AccountModule'
  //     }
  //   ]
  // },
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'logout',
        loadChildren: './logout/logout.module#LogoutModule'
      },
      {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
      }
      // {
      //   path: 'confirm',
      //   loadChildren: 'app/confirm/confirm.module#ConfirmModule'
      // },
      // {
      //   path: 'password-reset-request',
      //   loadChildren:
      //       'app/password-reset-request/password-reset-request.module#PasswordResetRequestModule'
      // },
      // {
      //   path: 'password-reset',
      //   loadChildren:
      //       'app/password-reset/password-reset.module#PasswordResetModule'
      // },
      // {
      //   path: 'sample-page',
      //   loadChildren: 'app/sample-page/sample-page.module#SamplePageModule'
      // }
    ]
  },
  // otherwise redirect to home
  { path: '**', component: P404Component }
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
