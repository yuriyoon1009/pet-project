import { AuthGuard } from './dev/guards/auth.guard';
import { AfterLoginGuard } from './dev/guards/after-login.guard';
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { ProfileComponent } from './dev/user/profile/profile.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';
import { ImgUploaderComponent } from './dev/img-uploader/img-uploader.component';
import { DashboardComponent } from './dev/dashboard/dashboard.component';
import { PetRegisterComponent } from './dev/pet/pet-register/pet-register.component';
import { MedicalInfoComponent } from './dev/medical-info/medical-info.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: 'signin',
    component: SignInComponent,
    canActivate: [AfterLoginGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AfterLoginGuard]
  },
  { path: 'img', component: ImgUploaderComponent },
  { path: 'petstate', component: PetStateComponent },
  { path: 'hospital', component: HospitalComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'register', component: PetRegisterComponent},
  { path: 'petedit', loadChildren: './dev/pet/pet.module#PetModule' },
  { path: 'medical', component: MedicalInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
