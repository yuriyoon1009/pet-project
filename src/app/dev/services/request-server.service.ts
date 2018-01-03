import { Pet, PetList } from './../pet/pet';
import { AuthService } from './auth.service';
import { IsLocation } from './hospital.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  pets: Pet;

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
    return this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
      .do(res => {
        this.pet_pk = this.getPetList(res.body)[0].pk;
      });
  }

  getSidebarPets() {
    return this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
    .do(res => {
      this.pets = this.getPetList(res.body);
    });
  }

  getPetList(resBody) {
    return resBody.map((list) => list.pet);
  }

}
