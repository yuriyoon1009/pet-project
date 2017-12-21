import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

export class HospitalComponent implements OnInit {
  response: any;
  cardLists: any;
  currentLocation: any;

  constructor(
    private http: HttpClient,
    private hospt: HospitalService
  ) { }

  ngOnInit() {
    this.currentLocation = {
      lat: 37.516143,
      lng: 127.019524
    };
    if (this.hospt.getHosipital(this.currentLocation)) {
      this.cardLists = this.hospt.getHosipital(this.currentLocation);
      console.log(this.cardLists);
    }
  }
}
