import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Services
import { AuthService } from './dev/service/auth.service';
// Components
import { AppComponent } from './app.component';
import { HospitalComponent} from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';

import { LoginComponent } from './dev/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    LoginComponent,
    UserProfileComponent,
    SignUpComponent,
    SignInComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthService, JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
