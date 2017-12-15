import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { list, pet } from '../pet';
@Component({
  selector: 'app-pet-register',
  templateUrl: './pet-register.component.html',
  styleUrls: ['../pet.component.scss', './pet-register.component.scss']
})
export class PetRegisterComponent implements OnInit {
  public radioGroupForm: FormGroup;
  list: any;
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/2/pets/';
  pets: any;
  petName: any;
  pettName: string = 'My Initial Title';
  datePicker;


  constructor( private formBuilder: FormBuilder, private http: HttpClient ) { }


  ngOnInit() {
    this.getPetList();
    this.radioGroupForm = this.formBuilder.group({
      'species': 'cat'
    });
  }

  getPetList() {
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

  addPet(content: string) {
    const newPet = { pk: this.lastPetPk(), name: this.petName };

    this.http.post(this.appUrl, newPet)
      .subscribe(() => this.pets = [newPet, ...this.pets]);
  }

  lastPetPk(): number {
    return this.pets.length ? Math.max(...this.pets.map(({ pk }) => pk)) + 1 : 1;
  }
}

