
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http/src/response';
import { Auth1Service } from '../../services/auth1.service';

/*import { list, pet } from '../pet';*/



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
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['../pet.component.scss', './pet-register.component.scss']
})
export class PetRegisterComponent implements OnInit {
  // petForm
  petForm: FormGroup;
  // 서버 appUrl
  appUrl = environment.apiUrl;
  // auth

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: Auth1Service
  ) {
    // 서버 url
    console.log(`[appUrl]`, this.appUrl);
    console.log(this.auth.getUserPk());
  }


  ngOnInit() {
    /* Form validation */
    this.petForm = this.fb.group({
      species: ['']
    });

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
  /*patch() {
    this.http.patch(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, )
  }*/
  // this.getPetList();
    /*this.radioGroupForm = this.formBuilder.group({
      'species': 'cat'
    });*/
 /* getPetList() {
    this.http.get<list>(this.appUrl)
      .subscribe(list => {
        this.list = list;
        this.pets = this.list.pets;
        console.log('[list]', list);
        console.log('[pet-list]', this.pets);
      },
      err => console.log(err.status, err.url),
      () => console.log('Done'));
  }
  */
  // public radioGroupForm: FormGroup;
  // appUrl = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/2/pets/';
  /*pets: any;
  petName: any;
  pettName: string = 'My Initial Title';
  datePicker;*/
 
  /* addPet(content: string) {
    const newPet = { pk: this.lastPetPk(), name: this.petName };

    this.http.post(this.appUrl, newPet)
      .subscribe(() => this.pets = [newPet, ...this.pets]);
  }

  lastPetPk(): number {
    return this.pets.length ? Math.max(...this.pets.map(({ pk }) => pk)) + 1 : 1;
  }*/

}
