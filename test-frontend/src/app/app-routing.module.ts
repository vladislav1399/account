import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {LoginLayoutComponent} from './shared/layouts/login-layout/login-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {AccountPageComponent} from './account-page/account-page.component';
import {AuthGuard} from './shared/classes/auth.guard';


const routes: Routes = [
  {path: '', component: LoginLayoutComponent, children: [
      {path: 'login', component: LoginPageComponent },
      {path: 'register', component: RegisterPageComponent },
    ]},

  {path: 'cabinet', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'account/:username', component: AccountPageComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

