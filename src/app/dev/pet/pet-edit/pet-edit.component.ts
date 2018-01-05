import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Pet, PetAges, BreedsList, BreedsName } from '../pet';
import { MatMenuTrigger } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from '../../services/auth.service';
import { PetService } from '../../services/pet.service';

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
  ) { }
}

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['../pet.component.scss', './pet-edit.component.scss'],
})
export class PetEditComponent implements OnInit {
  // appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/3/';
  // breedsUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/pet-breed-list/';
  // pets: any;
  // pet: any;
  petObject: object;
  value: any;
  date = new FormControl(new Date());
  selected = 'option2';
  breedsList: any;
  petForm: FormGroup;
  petBreedsArray: object;
  birth_date: string;
  appUrl = environment.apiUrl;
  petAge: string;
  converAge: string;
  petName: string;
  petSpecies: string;
  petArray: any;
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
    private auth: AuthService,
    public petService: PetService
  ) {
       // 서버 url
     console.log(`[appUrl]`, this.appUrl);
     console.log(this.auth.getUserPk());
     this.petForm = this.fb.group({
        name: ['dd'],
        species: [''],
        birthDate: [''],
        breeds: [null],
        bodyColor: [''],
        gender: [this.petType.genders[0]],
        operation: [this.petType.operation[1].boolean],
        number: ['']
     });
   }
  

  /*petForm */
  get name() {
    return this.petForm.get('name');
  }
  get operation() {
    return this.petForm.get('operation');
  }

  get number() {
    return this.petForm.get('number');
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
 
  get humanAge() {
    return this.petForm.get('humanAge');
  }

  get gender() {
    return this.petForm.get('gender');
  }

  get birthDate() {
    return this.petForm.get('birthDate');
  }
  /*petForm */
 /* get birthDate() {
    return this.petForm.get('birthDate');
  }*/
  ngOnInit() {
    this.getPet();
    this.getPetAges();
    this.petService.getPetPk();
  }
  // loading 시에만 실행 되는 함수
  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${this.petService.getPetPk()}/`,
    {observe: 'response'})
    .subscribe(res => {
       this.petObject = res.body;
       console.log('selected pet : ', this.petObject);
      /* petForm formgroup*/
      this.species.setValue(this.petObject.pet.species);
      this.name.setValue(this.petObject.pet.name);
      this.breeds.setValue(this.petObject.pet.breeds);
      this.birthDate.setValue(this.petObject.pet.birth_date);
      this.number.setValue(this.petObject.pet.identified_number);
      this.bodyColor.setValue(this.petObject.pet.body_color);
      this.gender.setValue(this.petObject.pet.gender);
      /* function operationBoolean */
      this.operationBoolean(this.petObject.pet.is_neutering);
      /* petForm formgroup*/
      this.changeBreedList(this.species.value);
    });
  }
  /* python은 False, True 때문에 프론트에서 string, 대문자를 
   바꿔주어야 한다.*/ 
  operationBoolean(boolean: boolean) {
    // convert boolean to string
    const convertString = boolean.toString();
    // after that, convert first letter uppercase
    const convertUpper = convertString.charAt(0).toUpperCase() + convertString.slice(1);
    // return True or False
    this.operation.setValue(convertUpper);
  }
  changeBreedList(species) {
    console.log('selected pet species :', species);
    // <BreedsList>
   this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
   .subscribe(res => {
      // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
      this.petArray = res;
      console.log('petArray : ', this.petArray);
   });
 }

  getPetAges() {
    this.http.get<PetAges>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${this.petService.getPetPk()}/age/`,
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

  sliceDate() {
    const fullDate = this.petForm.get('birthDate').value;
    const year = fullDate.getFullYear(),
    // issue : meterial month - 1로 나옴.
          month = fullDate.getMonth() + 1,
          date = fullDate.getDate();
    return this.birth_date = `${year}-${month}-${date}`;
  }

  onEdit() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    // callback 함수
    this.sliceDate();
    this.http.patch<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${this.petService.getPetPk()}/`,
      {
        name: this.name.value,
        species: this.petForm.get('species').value,
        breeds: this.petForm.get('breeds').value,
        birth_date: this.birth_date,
        identified_number: this.petForm.get('number').value,
        body_color: this.petForm.get('bodyColor').value,
        gender: this.petForm.get('gender').value,
        is_neutering: this.petForm.get('operation').value,
      }, {headers})
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


  // needless code
  /*checkedSpecies(species: string) {
    // console.log(species);
    // 매개변수 인수는 petObject.pet.species
    if (species === 'cat') {
      // this.petForm.species.setValue();
      return 0;
    }
    return 1;
  }*/
   // species cat, dog 매개변수 인수
  // cat, dog 조회 petArray 변수에 cat array 또는 dog array 할당
  // pet-edit, pet-register component 공통으로 사용하는 함수
  /*changeBreedList(species) {
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petBreedsArray = res;
       // console.log('petBreedsArray : ', this.petBreedsArray);
    });
  }*/
  // default 20180104
  /* breedList() {
    // <BreedsList>
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species: 'cat'})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petBreedsArray = res;
       console.log('petArray : ', this.petBreedsArray);
    });
  }*/ 

  /*changeBreedList(species) {
     console.log(species);
     // <BreedsList>
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petArray = res;
       console.log('petArray : ', this.petArray);
    });
  }*/

  /* sliceDate(date) {
    console.log(date);
  } */
  // this.petArray  ngFor로 할당

  // needless code
  /*checkedSpecies(species: string) {
    // console.log(species);
    // 매개변수 인수는 petObject.pet.species
    if (species === 'cat') {
      // this.petForm.species.setValue();
      return 0;
    }
    return 1;
  }*/
   // species cat, dog 매개변수 인수
  // cat, dog 조회 petArray 변수에 cat array 또는 dog array 할당
  // pet-edit, pet-register component 공통으로 사용하는 함수
  /*changeBreedList(species) {
    this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
    .subscribe(res => {
       // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
       this.petBreedsArray = res;
       // console.log('petBreedsArray : ', this.petBreedsArray);
    });
  }*/
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
 
