
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Pet, PetAges, BreedsList, BreedsName } from '../pet';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from '../../services/auth.service';
import { PetService } from '../../services/pet.service';


interface PetList {
  results: object;
}

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
  isShow = false;
  dataUrl = `../../../../assets/img/default.png`;
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
    private auth: AuthService,
    public petService: PetService,
    public snackBar: MatSnackBar
  ) {
       // 서버 url
     console.log(`[appUrl]`, this.appUrl);
     console.log(this.auth.getUserPk());
     this.petForm = this.fb.group({
        name: [null, Validators.required],
        species: [this.petType.types[0]],
        birthDate: [null, Validators.required],
        breeds: [null, Validators.required],
        bodyColor: [null, Validators.required],
        gender: [this.petType.genders[0]],
        operation: [this.petType.operation[1].boolean],
        number: [null],
        petAge: [33],
        profileImage: [null]
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

  get profileImage() {
    return this.petForm.get('profileImage');
  }
  /*petForm */

 
  ngOnInit() {
    this.getPet();
    this.breedList();
    console.log(this.petForm.value);
  }

  checkedSpecies(species) {
    if (species === 'cat') {
      return 0;
    }
    return 1;
  }
  deletePet(clickedPetPk) {
    this.getPet();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.delete<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${clickedPetPk}/`, {headers})
      .subscribe(res => {
        this.getPet();
        console.log('delete', this.petLists);
      }
    );
    this.snackBar.open('Delete', 'your pet', {duration: 2000});
  }

  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {
      console.log(res.body.results);
       this.petLists = res.body.results;
       this.petLists.reverse();
    });
  }


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


  // FileList 는 Angular에서 제공하는 인터페이스
  // 최근 업로드한 파일의 인덱스값은 0이다.
  /*
    files를 콘솔에 찍어보면 다음과 같은 객체....배열이 아니고 배열인 척 하는 객체네요
    서버로 보내는 페이로드의 바디값에 넣어줘야 할 것은 여기서 프로퍼티명이 '0'인 값을 보내줘야 해요
    그 안에는 파일 이름이나 사이즈, 타입 등이 들어있어요
  */
  readUrl(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.dataUrl = reader.result;
      };
      this.profileImage.setValue(file.name);
    }
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
          // this.petAgeArray.push(petAgeItem);
          // console.log('petAgeArray', this.petAgeArray);
      });
  }
  onSubmit(files: FileList) {
    // name.hasError('required')
    if (this.name.hasError('required') === true) {
      return this.isShow = true;
    }
    this.isShow = false;
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('species', this.species.value);
    formData.append('breeds', this.breeds.value);
    formData.append('birth_date', this.sliceDate());
    formData.append('identified_number', this.number.value);
    formData.append('body_color', this.bodyColor.value);
    formData.append('gender', this.gender.value);
    formData.append('is_neutering', this.operation.value);
    if (files[0]) {
      formData.append('image', files[0]);
    }
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    // callback 함수
    // this.birth_date string 할당
    // this.sliceDate();
    this.http.post<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`,
     formData, {headers})
        .subscribe((res) => {
        this.getPet();
        console.log('post', this.petLists);
        /* pet ages pk가 필요. last index 할당*/
        const lastIndex = this.petLists.length - 1;
        const petPk = this.petLists[lastIndex].pet.pk;
        this.getPetAges(petPk);
        this.snackBar.open('Create', 'your pet', {duration: 2000});
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
}

/*class PetList {
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
}*/

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

