import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit {
  cardLists: any;
  currentLocation: any;

  constructor(
    private http: HttpClient,
    private hospt: HospitalService
  ) { }

  ngOnInit() {
    this.currentLocation = {
      lng: 37.516143,
      lat: 127.019524
    };
    this.cardLists = this.hospt.getHosipital(this.currentLocation);
    // this.cardLists = [
    //   {
    //     title: '튼튼동물병원',
    //    // img: '../../../assets/img/img1.jpg',
    //     tel: '02-2063-9859',
    //     address: '서울시 강남구 신사동',
    //   },
    //   {
    //     title: '튼튼동물병원',
    //    // img: '../../../assets/img/img1.jpg',
    //     tel: '02-2063-9859',
    //     address: '서울시 강남구 신사동'
    //   },
    //   {
    //     title: '튼튼동물병원',
    //   //  img: '../../../assets/img/img1.jpg',
    //     tel: '02-2063-9859',
    //     address: '서울시 강남구 신사동'
    //   },
    //   {
    //     title: '튼튼동물병원',
    //  //   img: '../../../assets/img/img1.jpg',
    //     tel: '02-2063-9859',
    //     address: '서울시 강남구 신사동'
    //   }
    // ];
  }

}
