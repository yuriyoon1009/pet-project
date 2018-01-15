import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Pet, PetAges, BreedsList, BreedsName } from '../pet';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { environment } from './../../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { AuthService } from '../../services/auth.service';
import { PetService } from '../../services/pet.service';

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
  ) { }
}*/
/*interface PetList {
  owner: {
      pk: number,
      user_type: string,
      email: string,
      nickname: string,
      is_active: string,
      date_joined: string
  };
  pet: Array<Pet>;
}*/

interface PetList {
  results: object;
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
  // petObject: Array<PetList>;
  petObject: any;
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
  petLists: any;
  dataUrl: string;
  isShow = false;

   /* background:green url("../../../assets/img/pet.jpg") no-repeat -38px 0px;*/  
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
        name: [null],
        species: [''],
        birthDate: [''],
        breeds: [null],
        bodyColor: [''],
        gender: [this.petType.genders[0]],
        operation: [this.petType.operation[1].boolean],
        number: [''],
        profileImage: ['']
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
 /* get birthDate() {
    return this.petForm.get('birthDate');
  }*/
  ngOnInit() {
    this.getPet();
    this.getPetAges();
    this.getAllPets();
    this.petService.getPetPk();
  }

  getAllPets() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {

      console.log(res.body.results);
       this.petLists = res.body.results;
       this.petLists.reverse();
      // console.log(this.petLists);
     // this.reversePetLists();
     /*const lastIndex = this.petLists.length - 1;
      const petPk = this.petLists[lastIndex].pet.pk;
      this.getPetAges(petPk);*/
    });
  }

  // 하나의 pet 선택되었을때 edit 버트 클릭시 실행되는 함수
  clickedOtherPet(clickedPetPk) {
    this.petService.setPetPk(clickedPetPk);
    this.getPet();
  }
  // loading 시 img 조회 후 file에 할당

  /*alert() {
    alert(1);
  }*/

  // loading 시에만 실행되는 함수
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
      this.profileImage.setValue(this.petObject.pet.image);
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
    if (fullDate.length >= 8 || fullDate.length <= 12){
      return fullDate;
    }else {
      const year = fullDate.getFullYear(),
      // issue : meterial month - 1로 나옴.
            month = fullDate.getMonth() + 1,
            date = fullDate.getDate();
      return this.birth_date = `${year}-${month}-${date}`;
    }
  }

  deletePet(clickedPetPk) {
    // this.getAllPets();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.delete<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${clickedPetPk}/`, {headers})
      .subscribe(res => {
        this.getAllPets();
        console.log('delete', this.petLists);
      }
    );
    this.snackBar.open('Delete', 'your pet', {duration: 2000});
  }

  onEdit(files: FileList) {
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
    // this.sliceDate();
    this.http.patch<Pet>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${this.petService.getPetPk()}/`,
      formData, {headers})
        .subscribe((res) => {
        this.getAllPets();
        this.snackBar.open('Edit', 'your pet', {duration: 2000});
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log(err.error.message);
        } else {
          console.log(err.status);
        }
      }
    );
    this.getPetAges();
  }


  // convert image to binary code ?
  // after that, convert binary code to image for post


  readUrl(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
      this.dataUrl = reader.result;
      console.log(this.dataUrl);
    };
      this.profileImage.setValue(file.name);
    }

  }

  clickedImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    // console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''));
    this.dataUrl = dataURL;
  }


  /*checkWidth(width: number){
    console.log(width);
  }*/
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
