import { AuthService } from './auth.service';
import { IsLocation } from './hospital.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

@Injectable()
export class RequestServerService {
  appUrl = environment.apiUrl;
  user_pk: string;
  pet_pk: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    console.log('[appUrl] ', this.appUrl);
  }

  getMedicalInfo () {

    // return this.http.get(`${appUrl}/medical/${user_pk}/pets/${pet_pk}/operations/`)
  }

}
