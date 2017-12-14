import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

class SuccessLoginUser {
  constructor(
    public token: string,
    public user: {
      date_joined: string,
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
  ) { }
}

@Injectable()
export class Auth1Service {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'token';
  PK_NAME = 'user_pk';
  constructor( private http: HttpClient) {
    console.log('[appUrl] ', this.appUrl);
  }
  signin(loginForm: TryLoginUser): Observable<SuccessLoginUser> {
    return this.http.post<SuccessLoginUser>(`${this.appUrl}/auth/login/`, loginForm)
      .do(res => {
        this.setToken(res.token);
        this.setUserPk(res.user.pk);
      })
      .shareReplay();
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log(token);
    return token ? true : false;
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_NAME, token);
  }
  
  getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setUserPk(pk: any): void {
    localStorage.setItem(this.PK_NAME, pk);
  }

  getUserPk(): string {
    return localStorage.getItem(this.PK_NAME);
  }

  removeTokenAndPk(): void {
    console.log(localStorage);
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.PK_NAME);
  }


  // /*
  //   token 유효 기간 체크
  //   The JwtHelper class has several useful methods that can be utilized in your components:

  //   decodeToken
  //   getTokenExpirationDate
  //   isTokenExpired

  //   npm install angular2-jwt
  //   https://github.com/auth0/angular2-jwt
  // */
  // isTokenExpired(token: string) {
  //   return this.jwtHelper.isTokenExpired(token);
  // }

  // getUserid(): string {
  //   return this.jwtHelper.decodeToken(this.getToken()).userid;
  // }
}
