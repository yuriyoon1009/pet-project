import { SignUpComponent } from './dev/user/sign-up/sign-up.component';
import { SignInComponent } from './dev/user/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/user/user-profile/user-profile.component';
import { LoginComponent } from './dev/user/login/login.component';
import { PetStateComponent } from './dev/pet-state/pet-state.component';

const routes: Routes = [
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent },
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