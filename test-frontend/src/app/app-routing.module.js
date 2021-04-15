"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const login_page_component_1 = require("./login-page/login-page.component");
const login_layout_component_1 = require("./shared/layouts/login-layout/login-layout.component");
const register_page_component_1 = require("./register-page/register-page.component");
const main_layout_component_1 = require("./shared/layouts/main-layout/main-layout.component");
const account_page_component_1 = require("./account-page/account-page.component");
const auth_guard_1 = require("./shared/classes/auth.guard");
const routes = [
    { path: '', component: login_layout_component_1.LoginLayoutComponent, children: [
            { path: 'login', component: login_page_component_1.LoginPageComponent },
            { path: 'register', component: register_page_component_1.RegisterPageComponent },
        ] },
    { path: 'cabinet', component: main_layout_component_1.MainLayoutComponent, canActivate: [auth_guard_1.AuthGuard], children: [
            { path: 'account/:username', component: account_page_component_1.AccountPageComponent }
        ] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
