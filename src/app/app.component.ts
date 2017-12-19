import { AuthService } from './dev/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-sidebar *ngIf="isShow()"></app-sidebar>
  <app-sign-in *ngIf="!isShow()"></app-sign-in>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.isShow();
  }

  isShow() {
    return this.auth.getToken();
  }
}
