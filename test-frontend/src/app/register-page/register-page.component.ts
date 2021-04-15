import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/intefeices';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private toastrService: ToastrService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.toastrService.error('Enter username and password');
    } else {
      if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
        this.registerForm.disable();
        const user: User = this.registerForm.value;
        this.userService.register(user).subscribe( result => {
          if (result.status) {
            this.toastrService.success('User registered successfully');
            this.router.navigate(['/login']);
          } else {
            this.toastrService.error(result.message);
            this.registerForm.reset();
            this.registerForm.enable();
          }
        });
      } else {
        this.toastrService.error('Password mismatch');
      }
    }
  }
}
