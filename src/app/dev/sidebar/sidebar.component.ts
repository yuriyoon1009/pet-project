import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetList, Pet } from '../pet/pet';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Auth1Service } from '../services/auth1.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appUrl = environment.apiUrl;
  userPk: number;
  iconSize: number = 1;
  pets: Pet[];
  position = 'before';
  constructor(
    private http: HttpClient,
    private auth: Auth1Service, ) {}


  ngOnInit() {
    this.getPetList();
  }


  getPetList() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
      .subscribe(res => {
        this.pets = res.body.pets;
        console.log(this.pets);
        this.getPetPk();
        this.minPetPk();
        console.log('[min]', this.minPetPk())
      });
  }
  getPetPk(): number {
    return 
  }

  minPetPk(): number {
    return Math.min(...(this.pets.map((pet) => pet.pk)))
  }
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

}