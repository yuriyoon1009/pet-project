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
import { ChartsModule } from 'ng2-charts';
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
import { LoadingCircleComponent } from './dev/loading-circle/loading-circle.component';
import { MedicalComponent } from './dev/medical-info/medical/medical.component';
import { VaccinationComponent } from './dev/medical-info/vaccination/vaccination.component';
import { EditVaccinationComponent } from './dev/medical-info/edit-vaccination/edit-vaccination.component';
import { PetChartComponent } from './dev/pet-chart/pet-chart.component';
import { FacebookService } from 'ngx-facebook/dist/esm/providers/facebook';
import { PetService } from './dev/services/pet.service';

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
    LoadingCircleComponent,
    MedicalComponent,
    VaccinationComponent,
    EditVaccinationComponent,

    PetChartComponent

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
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AfterLoginGuard,
    HospitalService,
    FacebookService,
    PetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
