import { Injectable } from '@angular/core';
import { Pet, PetAges, BreedsList, BreedsName } from '../pet/pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PetService {
  appUrl = environment.apiUrl;
  pk_pet: string;
  petBreedsArray: object;
  constructor(private http: HttpClient) { }

  // species cat, dog 매개변수 인수
  // cat, dog 조회 petArray 변수에 cat array 또는 dog array 할당
  // pet-edit, pet-register component 공통으로 사용하는 함수
  changeBreedList(species) {
   this.http.post<BreedsList>(`${this.appUrl}/profile/pet-breed-list/`, {species})
   .subscribe(res => {
      // res = [{breeds_name: 'string'}, {breeds_name: 'string'} ... {breeds_name: 'string'}];
      this.petBreedsArray = res;
      console.log('petBreedsArray : ', this.petBreedsArray);
   });
 }
  setPetPk(pk: any): void {
    // 1. 기존 pk_pet 삭제
    localStorage.removeItem(this.pk_pet);
    // 2. pk_pet 재할당, localStorage는 string만 할당 가능
    localStorage.setItem(this.pk_pet, pk.toString());
    // console.log(localStorage.getItem(this.pk_pet));
    // console.log('pk', pk.toString());
    // console.log(typeof(pk.toString()));
  }

  getPetPk(): string {
    return localStorage.getItem(this.pk_pet);
  }
}
