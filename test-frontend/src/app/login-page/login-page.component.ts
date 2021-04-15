import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login(): void {
    const user = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.toastrService.error('Login or password incorrect');
    } else {
      this.loginForm.disable();
      this.authService.login(user).subscribe( (result: any) => {
        if (result.status) {
          localStorage.setItem('access-token', result.token);
          this.authService.setToken(result.token);
          this.toastrService.success('Enter successful');
          this.router.navigate(['cabinet']);
        } else {
          this.loginForm.enable();
          this.toastrService.error(result.message);
        }
      });
    }
  }

}
