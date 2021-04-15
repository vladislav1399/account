"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPageComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let AccountPageComponent = class AccountPageComponent {
    constructor(userService, route, toastrService, authService, router) {
        this.userService = userService;
        this.route = route;
        this.toastrService = toastrService;
        this.authService = authService;
        this.router = router;
        this.loading = false;
        this.username = '';
        this.user = {
            username: '',
            password: '',
            newPassword: ''
        };
    }
    ngOnInit() {
        this.loading = true;
        this.route.params.subscribe(params => {
            this.userService.getUserByUsername(params.username).subscribe(result => {
                this.loading = false;
                this.username = result.user.username;
                this.userForm = new forms_1.FormGroup({
                    username: new forms_1.FormControl(result.user.username),
                    password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
                    newPassword: new forms_1.FormControl(''),
                    repeatNewPassword: new forms_1.FormControl('')
                });
            });
        });
    }
    updateUser() {
        if (this.username !== this.userForm.value.username && this.userForm.value.newPassword !== '') {
            this.user = {
                username: this.username,
                password: this.userForm.value.password,
            };
            if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
                this.user.newPassword = this.userForm.value.newPassword;
                this.userService.confirmPassword(this.user).subscribe(resultConfirm => {
                    if (resultConfirm.status) {
                        this.user.username = this.userForm.value.username;
                        this.userService.updateUser(this.user, this.username).subscribe(resultUpdate => {
                            this.toastrService.success(resultUpdate.message);
                            this.authService.logout();
                            this.router.navigate(['/login']);
                        });
                    }
                    else {
                        this.toastrService.error(resultConfirm.message);
                    }
                });
            }
            else {
                this.toastrService.error('New passwords mismatch');
            }
        }
        else if (this.username === this.userForm.value.username && this.userForm.value.newPassword !== '') {
            this.user = {
                username: this.userForm.value.username,
                password: this.userForm.value.password,
            };
            if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
                this.user.newPassword = this.userForm.value.newPassword;
                this.userService.confirmPassword(this.user).subscribe(resultConfirm => {
                    if (resultConfirm.status) {
                        this.userService.updateUser(this.user, this.username).subscribe(resultUpdate => {
                            this.toastrService.success(resultUpdate.message);
                            this.authService.logout();
                            this.router.navigate(['/login']);
                        });
                    }
                    else {
                        this.toastrService.error(resultConfirm.message);
                    }
                });
            }
            else {
                this.toastrService.error('New passwords mismatch');
            }
        }
        else if (this.username !== this.userForm.value.username && this.userForm.value.newPassword === '') {
            this.user = {
                username: this.username,
                password: this.userForm.value.password,
                newPassword: ''
            };
            this.userService.confirmPassword(this.user).subscribe(resultConfirm => {
                if (resultConfirm.status) {
                    this.user.username = this.userForm.value.username;
                    this.userService.updateUser(this.user, this.username).subscribe(resultUpdate => {
                        if (resultUpdate.status) {
                            this.toastrService.success(resultUpdate.message);
                            this.authService.logout();
                            this.router.navigate(['/login']);
                        }
                        else {
                            this.toastrService.success(resultUpdate.message);
                        }
                    });
                }
                else {
                    this.toastrService.error(resultConfirm.message);
                }
            });
        }
        else {
            this.toastrService.info('nothing changed');
        }
        //
        //
        // // Смена логина и пароля вместе
        //
        //     this.user = {
        //       username: this.userForm.value.username,
        //       password: this.userForm.value.password
        //     };
        //
        //   if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
        //     this.userService.confirmPassword(this.user).subscribe( result => {
        //       if (result.status) {
        //         this.user.newPassword = this.userForm.value.newPassword;
        //         this.userService.updateUser(this.user, this.username).subscribe( resultUpdatePassword => {
        //           if (resultUpdatePassword.status) {
        //             this.toastrService.success(resultUpdatePassword.message);
        //           }
        //         });
        //       } else {
        //         this.toastrService.error(result.message);
        //       }
        //     });
        //   } else {
        //     this.toastrService.error('New passwords mismatch');
        //   }
        //   // Смена логина
        // } else if (this.username !== this.userForm.value.password && this.userForm.value.newPassword === '') {
        //   this.user = {
        //     username: this.username,
        //     password: this.userForm.value.password,
        //   };
        //   if (this.userForm.value.password !== '') {
        //     this.userService.confirmPassword(this.user).subscribe( result => {
        //       if (result.status) {
        //         this.user.username = this.userForm.value.username;
        //         this.userService.updateUser(this.user, this.username).subscribe( resultUpdate => {
        //           if (resultUpdate.status) {
        //             this.toastrService.success(resultUpdate.message);
        //             this.authService.logout();
        //             this.router.navigate(['/login']);
        //           } else {
        //             this.toastrService.error(result.message);
        //           }
        //         });
        //       } else {
        //         this.toastrService.error(result.message);
        //       }
        //     });
        //   } else {
        //     this.toastrService.error('Enter your old password');
        //   }
        //   // Смена только пароля
        // } else {
        //
        //
        //
        // }
    }
};
AccountPageComponent = __decorate([
    core_1.Component({
        selector: 'app-account-page',
        templateUrl: './account-page.component.html',
        styleUrls: ['./account-page.component.css']
    })
], AccountPageComponent);
exports.AccountPageComponent = AccountPageComponent;
