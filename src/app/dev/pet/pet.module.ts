/* Modules */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PetRoutingModule } from './pet-routing.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MyMaterialModule } from './../my-material.module';
/* Components */
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { PetRegisterComponent } from './pet-register/pet-register.component';

// import { PetRegisterTestComponent } from './pet-register-test/pet-register-test.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PetRoutingModule,
    Angular2FontawesomeModule,
    MyMaterialModule
  ],
  declarations: [
    PetRegisterComponent,
    PetEditComponent,
  ]
})
export class PetModule { }
