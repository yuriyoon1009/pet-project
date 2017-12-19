import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AfterLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private location: Location
  ) { }

  canActivate() {
    // 토큰 유효 기간 확인
    if (this.auth.isAuthenticated()) {
      console.log('이미 로그인이 되어 있어요');
      this.location.back();
      return false;
    }
    return true;
  }
}
