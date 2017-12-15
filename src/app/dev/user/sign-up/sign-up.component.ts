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
  regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  appUrl = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', [
        Validators.required,
        Validators.pattern(this.regexr)
      ]],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: PasswordValidator.match })
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

  signup() {
    const signupForm = {
      nickname: this.userName.value,
      email: this.userEmail.value,
      password1: this.password.value,
      password2: this.confirmPassword.value
    };
    console.log(`[payload] ${signupForm}`);
    this.http.post(`${this.appUrl}/auth/signup/`, signupForm)
      .subscribe(res => {
        console.log(res);
        console.log('회원가입 성공!');
        this.router.navigate(['signin']);
      });
  }
}
