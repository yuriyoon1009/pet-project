import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetList, Pet } from '../pet/pet';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Auth1Service } from '../services/auth1.service';
import { environment } from '../../../environments/environment';


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
  constructor(
    private http: HttpClient,
    private auth: Auth1Service, ) {
  }

  ngOnInit() {
    this.getPetList();
  }

  getPetList() {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
      .subscribe(res => {
        this.pets = res.body.pets;
        // let petImage = this.pets.map((item, index) => )
        console.log(this.pets);
      });
  }
}