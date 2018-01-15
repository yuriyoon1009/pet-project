import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';
import { environment } from './../../../environments/environment';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

// Marker Type
interface Marker {
  name: string;
  lat: number;
  lng: number;
  draggable?: boolean;
}

/*login test */
class Login {
  constructor(
    public pk: any,
    public user_type: any,
    public email: any,
    public nickname: any,
    public is_active: any,
    public date_joined: any
  ) {}
}

class Location {
  constructor(
    public lat: string,
    public lng: string
  ) {}
}
@Component({
  selector: 'app-root',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})


export class HospitalComponent implements OnInit {

  appUrl = environment.apiUrl;
  lat: any;
  lng: any;
  hospitals: any;
  title: string;
  constructor(
    private http: HttpClient,
    private hospt: HospitalService,
  ) {
      this.title = 'Map';
    }
  ngOnInit() {
    // Gps
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getHospital(this.lat, this.lng);
      });
    }
  }

  convertNum(string) {
    const num = +(string);
    return num;
  }

  getHospital(currentLat, currentLng) {
    // console.log(lat, lng);
    // const currentLocation = {'lat'}
    const lat = '' + currentLat;
    const lng = '' + currentLng;
    this.http.post<Location>(`${this.appUrl}/medical/search-hospital/`, {lat, lng}, {observe: 'response'})
      .subscribe(res => {
        this.hospitals = res.body;
        console.log(res.body);
        console.log('hospitals', this.hospitals);
        // agm-marker long, lat type must be number, so convert string to number
    });
  }

}
