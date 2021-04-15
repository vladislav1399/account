"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInterceptor = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let TokenInterceptor = class TokenInterceptor {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    intercept(req, next) {
        if (this.authService.isAuthenticatedUser()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.authService.getToken()
                }
            });
        }
        return next.handle(req).pipe(operators_1.catchError((error) => this.handleAuthError(error)));
    }
    handleAuthError(error) {
        if (error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    sessionFailed: true
                }
            });
        }
        return rxjs_1.throwError(error);
    }
};
TokenInterceptor = __decorate([
    core_1.Injectable()
], TokenInterceptor);
exports.TokenInterceptor = TokenInterceptor;
