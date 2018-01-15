import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PetAges } from './../pet/pet';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PetList, Pet, PetDetail } from '../pet/pet';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material';
import { RequestServerService } from '../services/request-server.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appUrl = environment.apiUrl;
  ageUrl;

  // 펫 정보
  pet: any;
  pets: Pet[];
  petAge: any;
  pk: number;
  // 펫이 존재하는지 체크
  noData = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private rs: RequestServerService,
    private router: Router,
    private route: ActivatedRoute
   ) {
  }
  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      const petPk = params.get('pk');

      return this.getDashboardPet(petPk);
    })
      .subscribe(res => {
        this.pet = res.body.pet;
        this.petAge = res.body.ages;
      });
      console.log(this.pet);
    }

  getDashboardPet(petPk) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
    return this.http.get<PetDetail>(
      `${this.appUrl}/profile/${this.auth.getUserPk()}/pets/${petPk}/`,
      { observe: 'response' }
    );
      // .do(res => {
      //   // console.log(res);
      //   this.pet = res.body.pet;
      //   // console.log(this.pet);
      //   if (!this.pet) {
      //     const noData = true;
      //   } else {
      //     const selectedPet = this.pet;
      //   }
      // });

    }
  }

    // this.http.get<PetList>(`${this.appUrl}/profile/${this.auth.getUserPk()}/pets/`, { observe: 'response' })
    //   .subscribe(res => {
    //     console.log(res);
    //     this.pets = this.getPetList(res.body);
    //     console.log(this.pets);
    //     if (!this.pets || this.pets.length === 0) {
    //       this.noData = true;
    //     } else {
    //       const selectedPet = this.pets[0];
    //       this.breeds = selectedPet.breeds;
    //       this.birth = selectedPet.birth_date;
    //       this.id_number = selectedPet.identified_number;
    //       this.gender = selectedPet.gender;
    //       this.body_color = selectedPet.body_color;
    //       this.is_neutering = selectedPet.is_neutering;
    //       this.pet_name = selectedPet.name;
    //       this.ageUrl = selectedPet.ages;
    //       this.getPetAges(this.ageUrl);
    //     }
    // });
    // }

  // getPetList(resBody) {
  //   return resBody.map((list) => list.pet);
  // }
  // // 펫 나이 url 접근
  // getPetAges(ageUrl) {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', `Token ${this.auth.getToken()}`);
  //   this.http.get<PetAges>(`${this.ageUrl}/`, { observe: 'response' })
  //     .subscribe(res => {
  //       this.petAge = res.body.pet_age;
  //       this.converAge = res.body.conversed_age;
  //     });
  //   }
