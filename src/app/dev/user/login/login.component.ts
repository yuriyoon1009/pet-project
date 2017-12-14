import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from './../../services/auth.service';
import { environment } from './../../../../environments/environment';

/* class Pet {
  constructor(
    public count: number,
    public next: null,
    public privious: null,
    public result: object
  ) { }
} */

// 나중에 분류하기 ./../models/user
class User {
  constructor(
    public token: string,
    public user: object
  ) { }
}
/*
interface User {
  token: string;
  user: <Info></Info>;
}
*/
class Info {
  constructor(
    public data_joined: string,
    public email: string,
    public is_active: boolean,
    public pk: number,
    public user_type: string
  ) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* +++++ member variable ++++ */
  // request error라면 message 변수에 할당
  message: string;
  // login FormGroup
  loginForm: FormGroup;
  // 서버 url
  appUrl = environment.apiUrl;
  // loginForm errors 체크
  userIdRequired: boolean;
  userIdPattern: boolean;
  pwdRequired: boolean;
  pwdPattern: boolean;
  // css addClass 기능 주기
  userBoolean: boolean;
  pwdBoolean: boolean;

  userTest: string;
  /* +++++ member variable ++++ */

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {
    // 서버 url
    console.log(`[appUrl]`, this.appUrl);
  }

  ngOnInit() {
    /* Form validation */
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')]
      ],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[0-9]).{8,12}/)]],
    });
    /* Form validation */
  }

  // 폼 모델에 접근할 수 있도록 getter를 정의한다.
  /* loginForm 개별로 접근하기 */
  get userId() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  logout() {
    this.auth.removeTokenAndPk();
  }
  // submit eventHandler 의 click event 실행시 onSubmit 함수 실행
  onSubmit() {
    // email validation
    this.userIdRequired = this.userId.hasError('required');
    this.userIdPattern = this.userId.hasError('pattern');
    // password validation
    this.pwdRequired = this.password.hasError('required');
    this.pwdPattern = this.password.hasError('pattern');

    /* const loginForm = {
      email: this.userId.value,
      password: this.password.value
    }; */
    /* loginForm validation 성공시
       email, password post 로 보내기 */
    if (this.loginForm.status === 'VALID') {
      console.log('[payload]', this.loginForm.value);
      this.auth.signin(this.loginForm.value)
        .subscribe(
          () => this.router.navigate(['profile'])
        );

        this.userTest = this.auth.getUserPk();
        console.log(this.userTest);
      /*this.http.post<User>(`${this.appUrl}/auth/login/`, this.loginForm.value)
      .subscribe(
        // 요청 성공 처리 콜백함수 (Observer의 next 함수)
        res => {
          console.log('[User] : ', res);
          console.log('[User token] : ', res.token);
          console.log('[User pk] : ', res.user.pk);
          // 로그인 성공시 페이지 이동
          // this.router.navigate(['hospital']);
        },
        // 요청 실패 처리 콜백함수 (Observer의 error 함수)
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // 클라이언트 또는 네트워크 에러
            console.log(`Client-side error : ${err.error.message}`);
          } else {
            // 백엔드가 실패 상태 코드 응답
            console.log(`Server-side error : ${err.status}`);
          }
        }
      );*/
    } else {
      // this.loginForm.status === 'INVALID'
      // this.userId.hasError('required') === true or false
      // 에러가 있다면 true (hasError)
      ((this.userIdRequired === true || this.userIdPattern === true) ? this.userBoolean = true : this.userBoolean = false);
      ((this.pwdRequired === true || this.pwdPattern === true) ? this.pwdBoolean = true : this.pwdBoolean = false);
    }
  }
}
