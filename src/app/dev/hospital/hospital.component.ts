import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  cardLists: any[];
  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.cardLists = [
      {
        title: '튼튼동물병원',
       // img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동',
      },
      {
        title: '튼튼동물병원',
       // img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      },
      {
        title: '튼튼동물병원',
      //  img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      },
      {
        title: '튼튼동물병원',
     //   img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      }
    ];
  }

}
