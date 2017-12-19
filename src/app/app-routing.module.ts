import { AuthGuard } from './dev/guards/auth.guard';
import { AfterLoginGuard } from './dev/guards/after-login.guard';
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { ProfileComponent } from './dev/user/profile/profile.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { LoginComponent } from './dev/user/login/login.component';
import { ImgUploaderComponent } from './dev/img-uploader/img-uploader.component';
import { DashboardComponent } from './dev/dashboard/dashboard.component';
import { PetRegisterComponent } from './dev/pet/pet-register/pet-register.component';
import { MedicalComponent } from './dev/medical-info/medical/medical.component';
import { VaccinationComponent } from './dev/medical-info/vaccination/vaccination.component';
import { EditVaccinationComponent } from './dev/medical-info/edit-vaccination/edit-vaccination.component';

const routes: Routes = [
  { path: 'img', component: ImgUploaderComponent },
  { path: 'signin',
    component: SignInComponent,
    canActivate: [AfterLoginGuard]
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] },
  { path: 'petstate', component: PetStateComponent },
  { path: 'hospital', component: HospitalComponent },
  { path: '',
    component: SignInComponent,
    canActivate: [AfterLoginGuard]
  },
  // 삭제할 예정
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'userprofile', component: UserProfileComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: PetRegisterComponent},
  { path: 'petedit', loadChildren: './dev/pet/pet.module#PetModule' },
  { path: 'medical', component: MedicalComponent },
  { path: 'vaccin', component: VaccinationComponent },
  { path: 'editvaccin', component: EditVaccinationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
