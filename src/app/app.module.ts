import { HospitalService } from './dev/services/hospital.service';
import { AfterLoginGuard } from './dev/guards/after-login.guard';
import { AuthGuard } from './dev/guards/auth.guard';
import { MyMaterialModule } from './dev/my-material.module';
import { SidebarComponent } from './dev/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Module
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PetModule } from './dev/pet/pet.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// Services
import { AuthService } from './dev/services/auth.service';
// Components
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { HospitalComponent} from './dev/hospital/hospital.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';
import { ProfileComponent } from './dev/user/profile/profile.component';
import { ImgUploaderComponent } from './dev/img-uploader/img-uploader.component';
import { DashboardComponent } from './dev/dashboard/dashboard.component';
import { MedicalInfoComponent } from './dev/medical-info/medical-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HospitalComponent,
    SignInComponent,
    SignUpComponent,
    PetStateComponent,
    ProfileComponent,
    ImgUploaderComponent,
    SidebarComponent,
    DashboardComponent,
    MedicalInfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Angular2FontawesomeModule,
    NoopAnimationsModule,
    MyMaterialModule,
    PetModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AfterLoginGuard,
    HospitalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
