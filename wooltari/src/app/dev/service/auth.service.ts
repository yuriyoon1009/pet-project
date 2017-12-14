import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { environment } from './../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

class SuccessLoginUser {
  constructor(
    public token: string,
    public user: {
      data_joined: string,
      email: string,
      is_active: boolean,
      pk: number,
      user_type: string
    }
  ) { }
}

class TryLoginUser {
  constructor(
    public email: string,
    public password: string
  ) {}
}


@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'jwt_token';
  constructor(private http: HttpClient, private jwtHelper: JwtHelper) { 
    console.log('[appUrl] ', this.appUrl);
  }
  signin(user: TryLoginUser): Observable<SuccessLoginUser> {
    return this.http.post<SuccessLoginUser>(`${this.appUrl}/auth/login/`, user)
      .do(res => {
        this.setToken(res.token);
        this.setUserPk(res.user.pk);
      })
      .shareReplay();
  }

  setToken(userToken: string): void {
    localStorage.setItem(this.TOKEN_NAME, userToken);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setUserPk(userPk): void {
    localStorage.setItem('loginUser_pk', userPk);
  }
  getUserPk() {
    return localStorage.getItem('loginUser_pk');
  }
  removeTokenAndPk(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem('loginUser_pk');
  }

}
