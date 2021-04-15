import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../intefeices';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(newUser: User): Observable<any> {
    return this.http.post<User>(`${environment.url}/user/register`, newUser);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<User>(`${environment.url}/user/${username}`);
  }

  confirmPassword(user: User): Observable<any>{
    return this.http.post<User>(`${environment.url}/user`, user);
  }

  updateUser(user: User, username: string): Observable<any> {
    return this.http.patch<User>(`${environment.url}/user/${username}`, user);
  }

}
