import { PetRegisterComponent } from './pet-register/pet-register.component';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PetRoutingModule } from './pet-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Angular2FontawesomeModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PetRoutingModule
  ],
  declarations: [
    PetRegisterComponent,
    PetEditComponent,
  ]
})
export class PetModule { }
