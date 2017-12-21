import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../password-validator';
import { Router } from '@angular/router';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

interface User {
  pk: number;
  user_type: string;
  email: string;
  nickname: string;
  is_active: string;
  date_joined: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../user-style.scss']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  appUrl = environment.apiUrl;
  Email: string;
  Nickname: string;
  dataUrl: string;
  message: string;
  isError: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.pattern(this.regexr)
      ]],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      profileImage: ['']
    });
    this.getProfile();
  }

  get userName() {
    return this.userForm.get('userName');
  }
  get passwordGroup() {
    return this.userForm.get('passwordGroup');
  }
  get password() {
    return this.userForm.get('passwordGroup.password');
  }
  get confirmPassword() {
    return this.userForm.get('passwordGroup.confirmPassword');
  }
  get profileImage() {
    return this.userForm.get('profileImage');
  }

  readUrl(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.dataUrl = reader.result;
      };
      this.profileImage.setValue(file.name);
    }
  }

  getProfile() {
    this.http.get<User>(`${this.appUrl}/profile/${this.auth.getUserPk()}/`, { observe: 'response' })
      .subscribe(res => {
        console.log(res);
        this.Email = res.body.email;
        this.Nickname = res.body.nickname;
        this.dataUrl = res.body.image;
      console.log('회원정보 불러오기 성공!');
      this.setForm();
    });
  }

  editProfile(files: FileList) {
    const formData = new FormData();
    formData.append('nickname', this.userName.value);
    formData.append('password1', this.password.value);
    formData.append('password2', this.confirmPassword.value);
    if (files[0]) {
      formData.append('image', files[0]);
    }
    // console.log(formData);
    // const editProfileForm = {
    //   nickname: this.userName.value,
    //   password1: this.password.value,
    //   password2: this.confirmPassword.value,
    //   formData
    // };
    // console.log(editProfileForm);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    console.log(`headers: ${headers}`);
    console.log(`[payload] ${formData}`);
    this.http.patch(`${this.appUrl}/profile/${this.auth.getUserPk()}/`, formData, { headers: headers })
      .subscribe(
        (res) => {
          console.log(res);
          console.log('회원정보 수정 성공!');
          this.router.navigate(['profile']);
        },
        (err: HttpErrorResponse) => {
        this.isError = true;
          if (!err.error.hasOwnProperty('email') && err.error.hasOwnProperty('nickname')) {
            // 닉네임이 이미 존재하는 경우
            this.message = 'Another user with this nickname already exists. Maybe it\'s your evil twin. Spooky.';
          } else {
            this.message = 'sth wrong';
          }
        }
      );
  }

  setForm() {
    console.log(this.dataUrl);
    this.userForm.patchValue({
      userName: this.Nickname,
      userEmail: this.Email,
      profileImage: this.dataUrl
    });
  }

  signout() {
    this.auth.logout();
    this.router.navigate(['signin']);
  }
}
