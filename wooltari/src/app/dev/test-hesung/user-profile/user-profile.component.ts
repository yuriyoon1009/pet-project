import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './password-validator';
import { environment } from './../../../../environments/environment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /* +++++ member variable ++++ */
  appUrl = environment.apiUrl;
  userForm: FormGroup;
  /* +++++ member variable ++++ */
  constructor(public fb: FormBuilder, public http: HttpClient) { 
    console.log(`[appUrl]`, this.appUrl);
  }

  ngOnInit() {
   /* userForm */
   this.userForm = this.fb.group({
      email: [''],
      nickName: ['', Validators.required],
      passwordGroup: this.fb.group({
        password1: ['', [Validators.required, Validators.pattern(/(?=.*[0-9]).{8,12}/)]],
        password2: ['', Validators.required]
      }, {validator: PasswordValidator.match})
   });
   /* userForm */
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

}
