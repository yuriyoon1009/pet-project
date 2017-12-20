
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from '../../services/auth1.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;

  // loginForm errors 체크
  userIdRequired: boolean;
  userIdPattern: boolean;
  pwdRequired: boolean;
  pwdPattern: boolean;
  // css addClass 기능 주기
  userBoolean: boolean;
  pwdBoolean: boolean;
  isError: boolean;

  userTest: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private auth: Auth1Service
  ) {
    // 서버 url
    // console.log(`[appUrl]`, this.appUrl);
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

  /*logout() {
    this.auth.removeTokenAndPk();
  }*/

 
  // submit eventHandler 의 click event 실행시 onSubmit 함수 실행
  onSubmit() {
    // email validation
    this.userIdRequired = this.userId.hasError('required');
    this.userIdPattern = this.userId.hasError('pattern');
    // password validation
    this.pwdRequired = this.password.hasError('required');
    this.pwdPattern = this.password.hasError('pattern');

 
    if (this.loginForm.status === 'VALID') {
      console.log('[payload]', this.loginForm.value);
      this.auth.signin(this.loginForm.value)
        .subscribe(
          () => this.router.navigate(['profile']),
          (err: HttpErrorResponse) => {
            this.isError = true;
            this.message = 'Invalid Email or Password';
            if (err.error instanceof Error) {
              // 클라이언트 또는 네트워크 에러
              console.log(`Client-side error : ${err.error.message}`);
            } else {
              // 백엔드가 실패 상태 코드 응답
              console.log(`Server-side error : ${err.status}`);
            }
          }
        );

        // this.userTest = this.auth.getUserPk();
        // console.log(this.userTest);
    } else {
      ((this.userIdRequired === true || this.userIdPattern === true) ? this.userBoolean = true : this.userBoolean = false);
      ((this.pwdRequired === true || this.pwdPattern === true) ? this.pwdBoolean = true : this.pwdBoolean = false);
    }
  }
}
