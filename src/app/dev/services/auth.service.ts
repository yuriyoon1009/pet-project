import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FacebookService, InitParams, LoginOptions } from 'ngx-facebook';
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

class FacebookLoginUser {
  constructor(
    public facebook_user_id: string,
    public access_token: string,
    public device_token: string
  ) { }
}

@Injectable()
export class AuthService {
  appUrl = environment.apiUrl;
  TOKEN_NAME = 'token';
  PK_NAME = 'user_pk';
  isLogin: boolean;

  constructor(
    private http: HttpClient,
    private facebook: FacebookService
  ) {
    console.log('[appUrl] ', this.appUrl);
    const params: InitParams = {
      appId: '1974634276151336',
      xfbml: true,
      version: 'v2.11'
    };
    facebook.init(params);

    // facebook SDK 로그인 관련 코드라 그대로 사용
    // (function (d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.11&appId=1974634276151336';
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginStatus() {
    this.facebook.getLoginStatus()
      .then(res => {
        console.log('로그인 체크 완료');
        console.log(res);
        if (res.status === 'connected') {
          const loginForm = {
            facebook_user_id: res.authResponse.accessToken,
            access_token: res.authResponse.userID,
            device_token: ''
          };
          console.log('로그인 시도..');
          this.facebookApi(loginForm);
        }
      })
      .catch(e => {
        console.log('로그인 체크 에러 발생');
        console.log(e);
      });
  }

  facebookLogin() {
    const options: LoginOptions = {
      scope: 'public_profile,email',
      return_scopes: true,
      enable_profile_selector: true
    };
    this.facebook.login(options)
      .then(() => {
        this.checkLoginStatus();
      })
      .catch();
  }

  facebookApi(loginForm: FacebookLoginUser) {
    console.log('facebookApi() 접근');
    this.http.post<SuccessLoginUser>(`${this.appUrl}/auth/facebook-login/`, loginForm)
      .subscribe(res => {
        this.setToken(res.token);
        this.setUserPk(res.user.pk);
        this.isLogin = true;
        console.log('로그인을 위한 준비 완료');
      });
      // .shareReplay();
  }

  facebookLogout() {
    this.facebook.logout().then(() => console.log('Logged out!'));
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
    this.removeTokenAndPk();
    return this.http.post(`${this.appUrl}/auth/logout/`, null, { headers: headers })
      .subscribe(
        (res) => console.log(res)
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

  removeTokenAndPk(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.PK_NAME);
    console.log(localStorage);
  }
}
