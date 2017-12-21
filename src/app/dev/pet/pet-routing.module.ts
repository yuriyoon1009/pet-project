import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { PetRegisterComponent } from './pet-register/pet-register.component';


const routes: Routes = [
  { path: '', component: PetEditComponent,
  // Children 라우팅 연습
    // children: [
    //   { path: 'register', component: PetRegisterComponent }] 
    },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule {
}
