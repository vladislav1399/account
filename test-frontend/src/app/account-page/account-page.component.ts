import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { UserService } from '../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../shared/intefeices';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private authService: AuthService,
              private router: Router) {
  }
    userForm: FormGroup;
    loading = false;
    username = '';

    user: any = {
      username: '',
      password: '',
      newPassword: ''
    };

  ngOnInit(): void {

    this.loading = true;
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(params.username).subscribe(result => {
        this.loading = false;
        this.username = result.user.username;
        this.userForm = new FormGroup({
          username: new FormControl(result.user.username),
          password: new FormControl('', [Validators.required, Validators.minLength(6)]),
          newPassword: new FormControl(''),
          repeatNewPassword: new FormControl('')
        });
      });
    });

  }


  updateUser(): void {
    if (this.username !== this.userForm.value.username && this.userForm.value.newPassword !== '') {
            this.user = {
                username: this.username,
                password: this.userForm.value.password,
            };

            if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
                this.user.newPassword = this.userForm.value.newPassword;
                this.userService.confirmPassword(this.user).subscribe( resultConfirm => {
                  if (resultConfirm.status) {
                        this.user.username = this.userForm.value.username;
                        this.userService.updateUser(this.user, this.username).subscribe( resultUpdate => {
                            this.toastrService.success(resultUpdate.message);
                            this.authService.logout();
                            this.router.navigate(['/login']);
                        });
                  } else {
                    this.toastrService.error(resultConfirm.message);
                  }
              });
            } else {
                  this.toastrService.error('New passwords mismatch');
            }
    } else if (this.username === this.userForm.value.username && this.userForm.value.newPassword !== '') {
        this.user = {
            username: this.userForm.value.username,
            password: this.userForm.value.password,
        };

        if (this.userForm.value.newPassword === this.userForm.value.repeatNewPassword) {
            this.user.newPassword = this.userForm.value.newPassword;
            this.userService.confirmPassword(this.user).subscribe( resultConfirm => {
                if (resultConfirm.status) {
                    this.userService.updateUser(this.user, this.username).subscribe( resultUpdate => {
                        this.toastrService.success(resultUpdate.message);
                        this.authService.logout();
                        this.router.navigate(['/login']);
                    });
                } else {
                    this.toastrService.error(resultConfirm.message);
                }
            });
        } else {
            this.toastrService.error('New passwords mismatch');
        }


    } else if (this.username !== this.userForm.value.username && this.userForm.value.newPassword === '') {
        this.user = {
            username: this.username,
            password: this.userForm.value.password,
            newPassword: ''
        };

        this.userService.confirmPassword(this.user).subscribe( resultConfirm => {
            if (resultConfirm.status) {
                this.user.username = this.userForm.value.username;
                this.userService.updateUser(this.user, this.username).subscribe( resultUpdate => {
                    if (resultUpdate.status) {
                        this.toastrService.success(resultUpdate.message);
                        this.authService.logout();
                        this.router.navigate(['/login']);
                    } else {
                        this.toastrService.success(resultUpdate.message);
                    }
                });
            } else {
                this.toastrService.error(resultConfirm.message);
            }
        });

    } else {
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
}
