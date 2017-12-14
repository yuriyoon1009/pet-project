import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Services
import { AuthService } from './dev/services/auth.service';
// Components
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './dev/user/login/login.component';
import { HospitalComponent} from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';
import { Auth1Service } from './dev/services/auth1.service';

@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    LoginComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    PetStateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    Auth1Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
