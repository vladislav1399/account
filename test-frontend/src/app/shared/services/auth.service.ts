import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../intefeices';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {

  }
  login(user: User): Observable<any> {
    return this.http.post<{token: string}>(`${environment.url}/user/auth`, user);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticatedUser(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();
  }

  decryptToken(): string {
    const token = localStorage.getItem('access-token');
    const tokenEncrypt: User = jwt_decode(token);
    return tokenEncrypt.username;
  }

}
