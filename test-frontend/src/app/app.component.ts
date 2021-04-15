import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{

  constructor(private router: Router,
              private authService: AuthService) {
  }

  title = 'test-frontend';
  ngOnInit(): void {
    const token = localStorage.getItem('access-token');
    if (token !== null) {
      this.authService.setToken(token);
      this.router.navigate(['/cabinet']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
