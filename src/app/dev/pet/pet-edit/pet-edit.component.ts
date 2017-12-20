import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { PetList, Pet, PetAges } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { Auth1Service } from '../../services/auth1.service';


@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['../pet.component.scss', './pet-edit.component.scss'],
})
export class PetEditComponent implements OnInit {
  // appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/3/';
  breedsUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/pet-breed-list/';
  pets: any;
  pet: any;
  value: any;
  date = new FormControl(new Date());
  selected = 'option2';
  breedsList: any;
  
  appUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private auth: Auth1Service
  ) {
   }

  ngOnInit() {
  }
  å
}