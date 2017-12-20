
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { list, pet, BreedsList, BreedsName } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { Auth1Service } from '../../services/auth1.service';


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
  pk?: number;
  species: string;
  breeds: string;
  name?: string;
  brith_date?: string;
  gender: string;
  body_color: string;
  identified_number?: string;
  is_neutering?: boolean;
  is_active?: boolean;
  ages: string;
  image?: string;
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
  petForm: FormGroup;
  petArray: object;
  appUrl = environment.apiUrl;
  // ngOninit에서 breedList 함수 실행 후
  /* this.petArray = [
    {breeds_name: 'string'},
    {breeds_name: 'string'} ...
    {breeds_name: 'string'}
  ];
  */
  /* petArray = [
    {'breeds_name': 'aa'}
  ];*/



  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private auth: Auth1Service
  ) {
       // 서버 url
     console.log(`[appUrl]`, this.appUrl);
     console.log(this.auth.getUserPk());
     this.petForm = this.fb.group({
        species: [],
        birthDate: [''],
        breeds: ['breeds !'],
        bodyColor: [''],
        petAge: [''],
        humanAge: [''],
        sex: ['']
     });
   }
  /*@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }*/
  get species() {
    return this.petForm.get('species');
  }
  get breeds() {
    return this.petForm.get('breeds');
  }
  get bodyColor() {
    return this.petForm.get('bodyColor');
  }
  get petAge() {
    return this.petForm.get('petAge');
  }
  get humanAge() {
    return this.petForm.get('humanAge');
  }

  get gender() {
    return this.petForm.get('sex');
  }

  get birthDate() {
    return this.petForm.get('birthDate');
  }
  ngOnInit() {

    // this.getPetList();
    // this.getBreedsList();
    // console.log(this.date.value);
    this.getPet();
    this.breedList();
    // console.log(this.petArray);
    // console.log('petArray', this.petArray[0].breeds_name);
  }
  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {
      console.log(res.body.pets);
      console.log(res.body);
      // console.log(owner);
    });
  }

   /*
    export interface BreedsList {
      breeds: Array<BreedsName>;
    }
  */

  // default
  breedList() {
    // <BreedsList>
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species: 'cat'})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petArray = res;
       console.log('petArray : ', this.petArray);
    });
  }

  changeBreedList(species) {
     console.log(species);
     // <BreedsList>
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petArray = res;
       console.log('petArray : ', this.petArray);
    });
  }

  sliceDate(date) {
    console.log(date);
  }
  // this.petArray  ngFor로 할당
 
  test() {
    console.log(this.birthDate.value);
    // console.log(birthDate)
   /* const petPayLoad = {
      species: this.species.value, breeds: this.breeds.value, body_color: this.bodyColor.value,
      ages: this.humanAge.value, gender: this.gender.value
    };
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.patch<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/15/`,
      petPayLoad, {headers})
        .subscribe((res) => {
        console.log('성공');
        console.log(this.getPet());
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(err.error.message);
        } else {
          console.log(err.status);
          console.log(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/15/`);
        }
      }
    );*/
  }

  /*patch() {
    // this.petForm.value
    const petPayLoad = {
      species: this.species.value, breeds: this.breeds.value, body_color: this.bodyColor.value,
      ages: this.humanAge.value, gender: this.gender.value
    };

    console.log(petPayLoad);
    let headers = new HttpHeaders();
    headers = headers.append('Authrization', `Token ${this.auth.getToken()}`);
    this.http.patch<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/15/`, petPayLoad,
    {headers})
      .subscribe( res => {
        console.log('success');
    });
  }*/
   /* let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);

    this.http.patch<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk}/pets/15/`,
      petPayLoad, {headers})
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
  }*/
}
  /*
    const signupForm = {
      nickname: this.userName.value,
      email: this.userEmail.value,
      password1: this.password.value,
      password2: this.confirmPassword.value
    };
  */
  /** */

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
