import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';

import { LoginComponent } from './dev/user/login/login.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'userprofile', component: UserProfileComponent},
  { path: 'petstate', component: PetStateComponent },

  { path: 'hospital', component: HospitalComponent },
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}