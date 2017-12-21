import { PetAges } from './../pet/pet';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetList, Pet } from '../pet/pet';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appUrl = environment.apiUrl;
  ageUrl;

  // 펫 정보
  pets: Pet[];
  breeds: string;
  ages: string;
  birth: string;
  id_number: string;
  gender: string;
  body_color: string;
  is_neutering: boolean;
  pet_name: string;

  // 펫이 존재하는지 체크
  noData = false;

  // 펫 나이, 사람나이변환
  petAge: string;
  converAge: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService, ) {
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

        if (!this.pets || this.pets.length === 0) {
          this.noData = true;
        } else {
          const selectedPet = this.pets[0];
          this.breeds = selectedPet.breeds;
          this.birth = selectedPet.birth_date;
          this.id_number = selectedPet.identified_number;
          this.gender = selectedPet.gender;
          this.body_color = selectedPet.body_color;
          this.is_neutering = selectedPet.is_neutering;
          this.pet_name = selectedPet.name;
          this.ageUrl = selectedPet.ages;
          this.getPetAges(this.ageUrl);
        }
    });
  }

  // 펫 나이 url 접근
  getPetAges(ageUrl) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    this.http.get<PetAges>(`${this.ageUrl}/`, { observe: 'response' })
      .subscribe(res => {
        this.petAge = res.body.pet_age;
        this.converAge = res.body.conversed_age;
      });
    }
  }
