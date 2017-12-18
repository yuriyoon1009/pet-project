import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { list, pet, breedsName } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['../pet.component.scss', './pet-edit.component.scss'],
})
export class PetEditComponent {
  
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/3/';
  breedsUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/pet-breed-list/';
  pets: any;
  pet: any;
  value: any;
  date = new FormControl(new Date());
  selected = 'option2';
  breedsList: any;

  constructor( private http: HttpClient) { }
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }

  ngOnInit() {
    this.getPetList();
    this.getBreedsList();
    // console.log(this.date.value);
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

  getBreedsList() {
    const payload = { "species": "dog" };

    this.http.post(this.breedsUrl, payload)
      .subscribe(res => 
        { this.breedsList = res;
          // const breedsName = this.breedsList.breeds_name;
          // const breedsName = [this.breedsList].forEach((item, index)=>{
          //   return [...(item.breeds_name)];
          // })
         // 뭐지......????
          console.log('[breedsList]', this.breedsList);
          // console.log('[breedsname]',breedsName);
         });
  }
}