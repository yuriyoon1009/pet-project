import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { list, pet } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['../pet.component.scss', './pet-edit.component.scss'],
})
export class PetEditComponent {
  
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/2/pets/9/';
  pets: any;
  pet: any;
  value: any;
  date = new FormControl(new Date());
  
  constructor( private http: HttpClient) { }
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit() {
    this.getPetList();
    
  }
  

  getPetList() {
    this.http.get<pet>(this.appUrl)
      .subscribe(res => {
        this.pets = res;
        this.pet = this.pets.pet;

        console.log('[pet]', this.pet);
        console.log('[pet.species]', this.pet.species);
        // console.log('[pet]', this.pet);
      },
      err => console.log(err.status, err.url),
      () => console.log('Done'));
  }

  speciesCheckCat() {
    if (this.pet.species === 'cat') {
      return
    }
  }
}