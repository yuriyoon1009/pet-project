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
import { LoginComponent } from './dev/test-hesung/login/login.component';
import { HospitalComponent} from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/test-hesung/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    LoginComponent,
    UserProfileComponent
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
