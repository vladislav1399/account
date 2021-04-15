"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPageComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let LoginPageComponent = class LoginPageComponent {
    constructor(authService, router, toastrService) {
        this.authService = authService;
        this.router = router;
        this.toastrService = toastrService;
    }
    ngOnInit() {
        this.loginForm = new forms_1.FormGroup({
            username: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    }
    login() {
        const user = this.loginForm.value;
        if (this.loginForm.invalid) {
            this.toastrService.error('Login or password incorrect');
        }
        else {
            this.loginForm.disable();
            this.authService.login(user).subscribe((result) => {
                if (result.status) {
                    localStorage.setItem('access-token', result.token);
                    this.authService.setToken(result.token);
                    this.toastrService.success('Enter successful');
                    this.router.navigate(['cabinet']);
                }
                else {
                    this.loginForm.enable();
                    this.toastrService.error(result.message);
                }
            });
        }
    }
};
LoginPageComponent = __decorate([
    core_1.Component({
        selector: 'app-login-page',
        templateUrl: './login-page.component.html',
        styleUrls: ['./login-page.component.css']
    })
], LoginPageComponent);
exports.LoginPageComponent = LoginPageComponent;
