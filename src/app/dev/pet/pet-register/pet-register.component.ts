import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
/* import { list, pet } from '../pet';*/
=======
// import { list, pet } from '../pet';
>>>>>>> eb61c5e42863f22124702318d909efc11a6f8f47
@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['../pet.component.scss', './pet-register.component.scss']
})
export class PetRegisterComponent implements OnInit {
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
<<<<<<< HEAD
    /* pet generic */
    this.http.get(this.appUrl)
      .subscribe(res => {
        this.pets = res;
        this.pet = this.pets.pet;

        console.log('[pet]', this.pet);
        console.log('[pet.species]', this.pet.species);
        // console.log('[pet]', this.pet);
      },
      err => console.log(err.status, err.url),
      () => console.log('Done'));
=======
    // this.http.get<pet>(this.appUrl)
    //   .subscribe(res => {
    //     this.pets = res;
    //     this.pet = this.pets.pet;

    //     console.log('[pet]', this.pet);
    //     console.log('[pet.species]', this.pet.species);
    //     // console.log('[pet]', this.pet);
    //   },
    //   err => console.log(err.status, err.url),
    //   () => console.log('Done'));
>>>>>>> eb61c5e42863f22124702318d909efc11a6f8f47
  }

  addPet(content: string) {
    const newPet = { pk: this.lastPetPk(), name: this.petName };

    this.http.post(this.appUrl, newPet)
      .subscribe(() => this.pets = [newPet, ...this.pets]);
  }

  lastPetPk(): number {
    return this.pets.length ? Math.max(...this.pets.map(({ pk }) => pk)) + 1 : 1;
  }
}

