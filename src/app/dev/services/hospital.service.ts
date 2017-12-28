import { IsLocation } from './hospital.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

export interface IsLocation {
  lat: string;
  lng: string;
}

@Injectable()
export class HospitalService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('[appUrl] ', this.appUrl);
   }

  getHosipital(currentLocation: IsLocation) {
    this.http.post(`${this.appUrl}/medical/search-hospital/`, currentLocation, { observe: 'response' })
      .subscribe(res => {
        console.log(res.body);
        return res.body;
      });
  }
}
