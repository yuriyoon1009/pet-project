import { LoadingCircleComponent } from './../../loading-circle/loading-circle.component';
import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit, OnChanges {
  cardLists: any;
  currentLocation: any;

  constructor(
    private http: HttpClient,
    private hospt: HospitalService
  ) { }

  ngOnInit() {
    this.currentLocation = {
      lng: 127.019524,
      lat: 37.516143
    };
    this.cardLists = this.hospt.getHosipital(this.currentLocation);
    console.log(this.cardLists);
    console.log(this.hospt.getHosipital(this.currentLocation));
  }

  ngOnChanges() {
    console.log(this.cardLists);
  }

}
