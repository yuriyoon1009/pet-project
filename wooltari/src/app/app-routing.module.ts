import { LoginComponent } from './dev/test-hesung/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalComponent } from './dev/hospital/hospital.component';
import { UserProfileComponent } from './dev/test-hesung/user-profile/user-profile.component';

const routes: Routes = [
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