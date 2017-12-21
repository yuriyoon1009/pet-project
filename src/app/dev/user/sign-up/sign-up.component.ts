import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from './../../services/auth.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../user-style.scss']
})

export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  email_regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  pass_regexr = /(?=.*[0-9]).{8,16}/;
  appUrl = environment.apiUrl;
  message: string;
  isError: boolean;
  dataUrl = `../../../../assets/img/users.png`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [
        Validators.required,
        Validators.pattern(this.email_regexr)
      ]],
      passwordGroup: this.fb.group({
        password: ['', [
          Validators.required,
          Validators.pattern(this.pass_regexr)
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.match }),
      profileImage: ['']
    });
  }

  get userName() {
    return this.userForm.get('userName');
  }
  get userEmail() {
    return this.userForm.get('userEmail');
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

  signup(files: FileList) {
    const formData = new FormData();
    formData.append('email', this.userEmail.value);
    formData.append('nickname', this.userName.value);
    formData.append('password1', this.password.value);
    formData.append('password2', this.confirmPassword.value);
    formData.append('image', files[0]);
    // const signupForm = {
    //   nickname: this.userName.value,
    //   email: this.userEmail.value,
    //   password1: this.password.value,
    //   password2: this.confirmPassword.value
    // };
    // console.log(`[payload] ${signupForm}`);
    this.auth.joinIn(formData)
      .subscribe(
        () => this.router.navigate(['profile']),
        (err: HttpErrorResponse) => {
          this.isError = true;
          if (err.error.hasOwnProperty('email') && !err.error.hasOwnProperty('nickname')) {
            // 이메일이 이미 존재하는 경우
            this.message = 'This email already exists. Please write another email.';
          } else if (!err.error.hasOwnProperty('email') && err.error.hasOwnProperty('nickname')) {
            // 닉네임이 이미 존재하는 경우
            this.message = 'Another user with this nickname already exists. Maybe it\'s your evil twin. Spooky.';
          } else {
            this.message = 'sth wrong';
          }
        }
      );
  }
}
