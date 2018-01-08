import { RequestServerService } from './../services/request-server.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pet, PetList } from '../pet/pet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appUrl = environment.apiUrl;
  userPk: number;
  iconSize: 1;
  list: any;
  // pets: Pets;
  pets: any;
  position = 'before';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private rs: RequestServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rs.setPetPkOnInit()
      .subscribe(() => console.log(this.rs.pet_pk));
    this.getSidebarPetList();
  }

  getSidebarPetList() {
    this.rs.getSidebarPets()
      .subscribe(res => {
        this.pets = this.rs.pets;
        console.log(this.pets);
      });
  }

  setPetPk(petPk) {
    this.rs.pet_pk = petPk;
  }

  signout() {
    this.auth.logout();
    this.router.navigate(['signin']);
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
