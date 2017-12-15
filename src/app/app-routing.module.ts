import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { ProfileComponent } from './dev/user/profile/profile.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { LoginComponent } from './dev/user/login/login.component';
import { ImgUploaderComponent } from './dev/img-uploader/img-uploader.component';

const routes: Routes = [
  { path: 'img', component: ImgUploaderComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'petstate', component: PetStateComponent },
  { path: 'hospital', component: HospitalComponent },
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'userprofile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}