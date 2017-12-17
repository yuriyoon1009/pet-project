import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth1Service } from './../services/auth1.service';

@Injectable()
export class AfterLoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: Auth1Service
  ) { }

  canActivate() {
    // 토큰 유효 기간 확인
    if (this.auth.isAuthenticated()) {
      console.log('이미 로그인이 되어 있어요');
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
