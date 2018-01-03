

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Pet, PetAges, BreedsList, BreedsName } from '../pet';
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
    public pet: Array<Pet>
  ) {}
}
/*
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
}*/
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
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['../pet.component.scss', './pet-register.component.scss']
})
export class PetRegisterComponent implements OnInit {
  // appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/3/';
  // breedsUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/pet-breed-list/';
  pets: any;
  pet: any;
  value: any;
  date = new FormControl(new Date());
  selected = 'option2';
  breedsList: any;
  petForm: FormGroup;
  petArray: object;
  birth_date: string;
  appUrl = environment.apiUrl;
  petAge: string;
  converAge: string;
  petLists: any;
  aa;
   petAgeArray: object[] = [
    {'pk': 3, 'petAge': 3, 'conversed_age': 3},
    {'pk': 3, 'petAge': 4, 'conversed_age': 4}
  ];
  /*
    pet이 추가 될때마다 petAgeArray에 push 됨.
     petAgeArray =
      [
        {'pk': petPk,
         'petAge': res.body.pet_age,
         'conversed_age': res.body.converesed_age}
      ]
  */
  birth: string;
  // Dummy date
  // Python은 boolean이 대문자여서 string으로 변환이 필요하다.
  petType = {
      types: ['cat', 'dog'],
      colors: ['white', 'black', 'brown', 'gold'],
      genders: ['male', 'female'],
      operation: [
        {
          boolean: 'True',
          visible: 'yes'
        },
        {
          boolean: 'False',
          visible: 'no'
        }
      ]
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
       // 서버 url
     console.log(`[appUrl]`, this.appUrl);
     console.log(this.auth.getUserPk());
     this.petForm = this.fb.group({
        name: [null],
        species: [this.petType.types[0]],
        birthDate: [null],
        breeds: [null],
        bodyColor: [null],
        gender: [this.petType.genders[0]],
        operation: [this.petType.operation[1].boolean],
        number: [null],
        petAge: [33]
     });
   }
  /*@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  someMethod() {
    this.trigger.openMenu();
  }*/

  get birthDate() {
    return this.petForm.get('birthDate');
  }
  get species() {
    return this.petForm.get('species');
  }
  get breeds() {
    return this.petForm.get('breeds');
  }
  get bodyColor() {
    return this.petForm.get('bodyColor');
  }
  /*get petAge() {
    return this.petForm.get('petAge');
  }*/
  get petAgeForm() {
    return this.petForm.get('petAge');
  }

  get humanAge() {
    return this.petForm.get('humanAge');
  }

  get gender() {
    return this.petForm.get('gender');
  }

 
  ngOnInit() {
    this.getPet();
    this.breedList();
    console.log(this.petForm.value);
    // this.test()
    // this.getPetAges(); ! to do
    // console.log(this.petArray);
    // console.log('petArray', this.petArray[0].breeds_name);
    // this.getPetList();
    // this.getBreedsList();
    // console.log(this.date.value);
  }

  deletePet(clickedPetPk) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.delete<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${clickedPetPk}/`, {headers})
      .subscribe(res => {
        this.getPet();
        console.log('delete', this.petLists);
      }
    );
  }

  reversePetLists() {
    this.petLists.reverse();
  }
  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {
      this.petLists = res.body;
      this.reversePetLists();
     /*const lastIndex = this.petLists.length - 1;
      const petPk = this.petLists[lastIndex].pet.pk;
      this.getPetAges(petPk);*/
    });
  }

  // this.petList
   /*
    export interface BreedsList {
      breeds: Array<BreedsName>;
    }
   */
/*  getPetAges() ! to do !!!
  getPetAges() {
    this.http.get<PetAges>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/1/age/`,
    {observe: 'response'})
      .subscribe(res => {
        this.petAge = res.body.pet_age;
        this.converAge = res.body.conversed_age;
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

  /* sliceDate(date) {
    console.log(date);
  } */
  // this.petArray  ngFor로 할당
  sliceDate() {
    const fullDate = this.petForm.get('birthDate').value;
    const year = fullDate.getFullYear(),
    // issue : meterial month - 1로 나옴.
          month = fullDate.getMonth() + 1,
          date = fullDate.getDate();
    return this.birth_date = `${year}-${month}-${date}`;
  }

  // humanage
  /*
    get humanAge() {
      return this.petForm.get('humanAge');
    }
     get birthDate() {
      return this.petForm.get('birthDate');
     }
  */
  /*
     getPetAges() {
    this.http.get<PetAges>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/1/age/`,
    {observe: 'response'})
      .subscribe(res => {
        this.petAge = res.body.pet_age;
        this.converAge = res.body.conversed_age;
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
  */
  lastIndex() {
    return this.petLists.length ? this.petLists.length - 1 : 0;
  }
  test2() {
    this.aa = this.petLists.map( ({pet}, index) => {
      // console.log(index);
      return index === this.lastIndex() ? Object.assign(pet, {pet_age: 'test', conversed_age: 'test'}) : pet;
    });
     console.log(this.aa);
  }
  getPetAges(petPk) {
    this.http.get<PetAges>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${petPk}/age/`,
    {observe: 'response'})
      .subscribe(res => {
           const petAgeItem =  {
             'petAge': res.body.pet_age,
             'conversed_age': res.body.conversed_age
           };
           // this.test2();
          // console.log(this.aa);
          this.petAgeArray.push(petAgeItem);
          console.log('petAgeArray', this.petAgeArray);
      });
  }
  onSubmit() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    // callback 함수
    // this.birth_date string 할당
    this.sliceDate();
    const payload = {
      name: this.petForm.get('name').value,
      species: this.petForm.get('species').value,
      breeds: this.petForm.get('breeds').value,
      body_color: this.petForm.get('bodyColor').value,
      gender: this.petForm.get('gender').value,
      is_neutering: this.petForm.get('operation').value,
      birth_date: this.birth_date,
      identified_number: this.petForm.get('number').value
    };

    this.http.post<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`,
     payload, {headers})
        .subscribe((res) => {
        this.getPet();
        console.log('post', this.petLists);
        /* pet ages pk가 필요. last index 할당*/
        const lastIndex = this.petLists.length - 1;
        const petPk = this.petLists[lastIndex].pet.pk;
        this.getPetAges(petPk);
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



/*export class PetRegisterComponent implements OnInit {
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

    this.getPetList();
  }
  getPetList() {
  /* pet generic */
  /*   this.http.get(this.appUrl)
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

  addPet(content: string) {
    const newPet = { pk: this.lastPetPk(), name: this.petName };

    this.http.post(this.appUrl, newPet)
      .subscribe(() => this.pets = [newPet, ...this.pets]);
  }

  lastPetPk(): number {
    return this.pets.length ? Math.max(...this.pets.map(({ pk }) => pk)) + 1 : 1;
  }
}*/

