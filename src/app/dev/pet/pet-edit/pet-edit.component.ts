import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import { list, pet, breedsName } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from '../../services/auth.service';

class PetList {
  constructor(
    public owner: {
      pk: number,
      user_type: string,
      email: string,
      nickname: string,
      is_active: string,
      date_joined: string
    },
    public pets: Array<Pet>
  ) {}
}

interface Pet {
  pk: number;
  species: string;
  breeds: string;
  name: string;
  brith_date: string;
  gender: string;
  body_color: string;
  identified_number?: string;
  is_neutering?: boolean;
  is_active: boolean;
  ages: string;
  image: string;
}
/*
interface PetList {
  owner: {
    pk: number;
    user_type: string;
    email: string;
    nickname: string;
    is_active: string;
    date_joined: string;
  };
  pet: Array<Pet>;
}

interface User {
  pk: number;
  user_type: string;
  email: string;
  nickname: string;
  is_active: string;
  date_joined: string;
}
*/

/*class SuccessLoginUser {
  constructor(
    public token: string,
    public user: {
      date_joined: string,
      email: string,
      is_active: boolean,
      pk: number,
      user_type: string
    }
  ) { }
}*/

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
    private auth: AuthService
  ) {
       // 서버 url
     console.log(`[appUrl]`, this.appUrl);
     console.log(this.auth.getUserPk());
   }
  /*@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }*/

  ngOnInit() {

    // this.getPetList();
    // this.getBreedsList();
    // console.log(this.date.value);
    this.getPet();
  }
  
  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {
      console.log(res.body.pets);
      console.log(res.body);
      // console.log(owner);
    });
  }
  test() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.patch<Pet>(`${this.appUrl}/profile/5/pets/15/`,
      {body_color: 'black'}, {headers})
        .subscribe((res) => {
        console.log('성공');
        console.log(this.getPet());
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(err.error.message);
        } else {
          console.log(err.status);
        }
      }
    );
  }
  /*getPetList() {
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
  */
  /*speciesCheckCat() {
    if (this.pet.species === 'cat') {
      return
    }
  }*/

  /*getBreedsList() {
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
  }*/
}
