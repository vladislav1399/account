"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_component_1 = require("./app.component");
const main_layout_component_1 = require("./shared/layouts/main-layout/main-layout.component");
const login_layout_component_1 = require("./shared/layouts/login-layout/login-layout.component");
const login_page_component_1 = require("./login-page/login-page.component");
const register_page_component_1 = require("./register-page/register-page.component");
const account_page_component_1 = require("./account-page/account-page.component");
const app_routing_module_1 = require("./app-routing.module");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const header_block_component_1 = require("./shared/layouts/main-layout/header-block/header-block.component");
const angular_jwt_1 = require("@auth0/angular-jwt");
const ngx_toastr_1 = require("ngx-toastr");
const animations_1 = require("@angular/platform-browser/animations");
const token_interceptor_1 = require("./shared/classes/token.interceptor");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            main_layout_component_1.MainLayoutComponent,
            login_layout_component_1.LoginLayoutComponent,
            login_page_component_1.LoginPageComponent,
            register_page_component_1.RegisterPageComponent,
            account_page_component_1.AccountPageComponent,
            header_block_component_1.HeaderBlockComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpClientModule,
            ngx_toastr_1.ToastrModule.forRoot(),
            animations_1.BrowserAnimationsModule,
        ],
        providers: [
            { provide: http_1.HTTP_INTERCEPTORS, multi: true, useClass: token_interceptor_1.TokenInterceptor },
            { provide: angular_jwt_1.JWT_OPTIONS, useValue: angular_jwt_1.JWT_OPTIONS },
            angular_jwt_1.JwtHelperService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
