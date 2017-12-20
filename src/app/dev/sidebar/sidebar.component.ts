import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { list, pet } from '../pet/pet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  iconSize: number = 1;
  list: any;
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/3/pets/';
  pets: pet[];

  constructor(private http: HttpClient, private router: Router) {
    }

  
  ngOnInit() {
    this.getPetList();
  }
  toGo(){
    this.router.navigateByUrl('/user');
  }
  getPetList() {
    this.http.get<list>(this.appUrl)
      .subscribe(list => {
        this.list = list;
        this.pets = this.list.pets;
        console.log(this.pets);
      },
      err => console.log(err.status, err.url),
      () => console.log('Done'));
  }

  
}