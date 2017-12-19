import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'token';
  PK_NAME = 'user_pk';
  isLogin: boolean;

  constructor(private http: HttpClient) {
    console.log('[appUrl] ', this.appUrl);
  }

  joinIn(signupForm) {
    return this.http.post(`${this.appUrl}/auth/signup/`, signupForm)
      .do(res => {
        console.log(res);
        console.log('회원가입 성공!');
      });
  }

  // 로그인
  login(loginForm: TryLoginUser): Observable<SuccessLoginUser> {
    return this.http.post<SuccessLoginUser>(`${this.appUrl}/auth/login/`, loginForm)
      .do(res => {
        this.setToken(res.token);
        this.setUserPk(res.user.pk);
        this.isLogin = true;
      })
      .shareReplay();
  }

  // 로그아웃
  logout() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.getToken()}`);
    this.isLogin = false;
    return this.http.post(`${this.appUrl}/auth/logout/`, null , { headers: headers })
      .subscribe(
        (res) => this.removeTokenAndPk(res),
        (res) => this.isLogin = false
      );
  }

  // 토큰 유효성 검증
  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
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

  removeTokenAndPk(res): void {
    console.log(res.message);
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.PK_NAME);
    console.log(localStorage);
  }
}
