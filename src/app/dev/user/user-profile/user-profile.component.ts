import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../password-validator';
import { environment } from './../../../../environments/environment';

import { AuthService } from './../../services/auth.service';

interface User {
  pk?: number;
  user_type?: string;
  email: string;
  nickname: string;
  is_active?: boolean;
  date_joined?: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /* +++++ member variable ++++ */
  appUrl = environment.apiUrl;
  userForm: FormGroup;
  // user pk 할당하기
  userPk: number;
  // api user 정보 변수에 할당하기
  userEmail: string;
  userName: string;
  /* +++++ member variable ++++ */
  constructor (
    public fb: FormBuilder,
    public http: HttpClient,
    public auth: AuthService
  ) {
    console.log(`[appUrl]`, this.appUrl);
  }

  logout() {
    this.auth.removeTokenAndPk();
  }
  ngOnInit() {
    this.userPk = +(this.auth.getUserPk());
    this.http.get<User>(`${this.appUrl}/profile/${this.userPk}/`, {observe: 'response'})
     .subscribe(res => {
        console.log(res.body);
        console.log(res.body.email);
        console.log(res.body.nickname);
        this.userEmail = res.body.email;
        this.userName = res.body.nickname;
     });
   /* userForm */
   this.userForm = this.fb.group({
    email: [``],
    nickName: [``, Validators.required],
    passwordGroup: this.fb.group({
      password1: ['', [Validators.required, Validators.pattern(/(?=.*[0-9]).{8,12}/)]],
      password2: ['', Validators.required]
      }, {validator: PasswordValidator.match})
    });
    console.log(this.userForm);
    this.setUserForm();
   /* userForm */
   // console.log(typeof(+(this.auth.getUserPk())));
  }
  // userForm key 개별로 접근
  get nickName() {
    return this.userForm.get('nickName');
  }

  get passwordGroup() {
    return this.userForm.get('passwordGroup');
  }

  get password1() {
    return this.userForm.get('passwordGroup.password1');
  }

  get password2() {
    return this.userForm.get('passwordGroup.password2');
  }
  setUserForm () {
    this.userForm.setValue({
      email: this.userEmail,
      nickName: this.userName
    });

  }
}
