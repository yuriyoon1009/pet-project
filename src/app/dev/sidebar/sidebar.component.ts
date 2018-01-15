import { Pet } from '../pet/pet';
/* 20180106
import { PetList, Pet } from '../pet/pet';*/
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetService } from './../services/pet.service';

/*
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
*/
class PetList {
  constructor(
    public results: object
  ) {}
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appUrl = environment.apiUrl;
  userPk: number;
  // iconSize: number = 1;
  petLists: any;
  pets: Pet[];
  position = 'before';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    public petService: PetService
  ) {}



  list: any;
  // appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/';
  // pets: pet[];


  ngOnInit() {
    this.getPet();
   // this.getPetList();
  }
  /* 20180106 */
  getPet() {
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, {observe: 'response'})
    .subscribe(res => {
      console.log(res);
      this.petLists = Array.prototype.reverse.call(res.body.results);
      console.log(this.petLists);
    });
  }

  gotoDashboard(pk): void {
    this.router.navigate(['/dashboard', pk]);
  }

  signout() {
    this.auth.logout();
    this.router.navigate(['signin']);
  }
  /* 20180106 */
  /*getPetList() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
      .subscribe(res => {
        this.pets = this.rs.pets;
        console.log(this.pets);
        // this.getPetPk();
        // this.minPetPk();
        // console.log('[min]', this.minPetPk())
      });
  }*/

  // minPetPk(): number {
  //  return Math.min(...(this.pets.map((pet) => pet.pk)))
  // }
  // toggleComplete(id: number) {
  //   // this.todos.forEach(todo => {
  //   //   todo = todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
  //   // });
  //   this.todos = this.todos.map(todo => {
  //     return todo.id === id ? Object.assign(todo, { completed: !todo.completed }) : todo;
  //   });
  // }
  // getCSSClasses(flag: number) {
  //   let cssClasses;
  //   let petPk = this.pets.map(pet => pet.pk)

  //   if (flag == ) {
  //     cssClasses = {
  //       'one': true, 'two': true
  //     }
  //   }
  //   else {
  //     cssClasses = {
  //       'two': true, 'four': false
  //     }
  //   }
  //   return cssClasses;
  // }


 // getPetList() {
    // this.http.get<list>(this.appUrl)
    //   .subscribe(list => {
    //     this.list = list;
    //     this.pets = this.list.pets;
    //     console.log(this.pets);
    //   },
    //   err => console.log(err.status, err.url),
    //   () => console.log('Done'));
 // }
 
}
