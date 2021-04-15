"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPageComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let RegisterPageComponent = class RegisterPageComponent {
    constructor(toastrService, userService, router) {
        this.toastrService = toastrService;
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() {
        this.registerForm = new forms_1.FormGroup({
            username: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)])
        });
    }
    register() {
        if (this.registerForm.invalid) {
            this.toastrService.error('Enter username and password');
        }
        else {
            if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
                this.registerForm.disable();
                const user = this.registerForm.value;
                this.userService.register(user).subscribe(result => {
                    if (result.status) {
                        this.toastrService.success('User registered successfully');
                        this.router.navigate(['/login']);
                    }
                    else {
                        this.toastrService.error(result.message);
                        this.registerForm.reset();
                        this.registerForm.enable();
                    }
                });
            }
            else {
                this.toastrService.error('Password mismatch');
            }
        }
    }
};
RegisterPageComponent = __decorate([
    core_1.Component({
        selector: 'app-register-page',
        templateUrl: './register-page.component.html',
        styleUrls: ['./register-page.component.css']
    })
], RegisterPageComponent);
exports.RegisterPageComponent = RegisterPageComponent;
