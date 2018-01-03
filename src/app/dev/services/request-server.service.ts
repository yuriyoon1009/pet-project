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

  constructor(private http: HttpClient) {
    console.log('[appUrl] ', this.appUrl);
  }

}
