import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header-block',
  templateUrl: './header-block.component.html',
  styleUrls: ['./header-block.component.css']
})
export class HeaderBlockComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  username: string;

  ngOnInit(): void {
    this.username = this.authService.decryptToken();
    console.log(this.username);

  }

  logout(): void {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.toastrService.success('Exit confirmed');

  }
}
