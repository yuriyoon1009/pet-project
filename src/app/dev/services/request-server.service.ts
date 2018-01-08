import { Pet, PetList, PetDetail } from './../pet/pet';
import { AuthService } from './auth.service';
import { IsLocation } from './hospital.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class RequestServerService {
  appUrl = environment.apiUrl;
  user_pk: string;
  pet_pk: number;
  pets: Pet[];
  pet: Pet;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    console.log('[appUrl] ', this.appUrl);
  }

  getMedicalInfo () {

    // return this.http.get(`${appUrl}/medical/${user_pk}/pets/${pet_pk}/operations/`)
  }

  setPetPkOnInit() {
    return this.http.get<PetDetail[]>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
      .do(res => {
        this.pet_pk = res.body.map((list) => list.pet)[0].pk;
        console.log(this.pet_pk);
      });
  }

  getSidebarPets() {
    return this.http.get<Pet[]>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
    .do(res => {
      this.pets = this.getPetList(res.body);
    });
  }

  getPetList(resBody) {
    return resBody.map((list) => list.pet);
  }

  getDashboardPet() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    return this.http.get<PetDetail>(
      `${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${this.pet_pk}`,
      { observe: 'response' }
    )
      .do(res => {
        console.log(res);
        this.pet = res.body.pet;
        console.log(this.pet);
        if (!this.pet) {
          const noData = true;
        } else {
          const selectedPet = this.pet;
        }
      });
  }

}
