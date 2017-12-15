import { SidebarComponent } from './dev/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Module
import { AppRoutingModule } from './app-routing.module';
import { PetModule } from './dev/pet/pet.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { ProfileComponent } from './dev/user/profile/profile.component';
import { ImgUploaderComponent } from './dev/img-uploader/img-uploader.component';
@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    LoginComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    PetStateComponent,
    ProfileComponent,
    ImgUploaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PetModule,
    Angular2FontawesomeModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    Auth1Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
