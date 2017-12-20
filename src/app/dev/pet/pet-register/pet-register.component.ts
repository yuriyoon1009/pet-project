import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['../pet.component.scss', './pet-register.component.scss']
})
export class PetRegisterComponent implements OnInit {
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/3/';
  breedsUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/pet-breed-list/';
  pets: any;
  pet: any;
  value: any;
  date = new FormControl(new Date());
  selected = 'option2';
  dogBreeds: object;
  petName: string;

  constructor( private formBuilder: FormBuilder, private http: HttpClient ) { }


  ngOnInit() {
  }
}

