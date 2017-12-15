import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { list, pet } from '../pet/pet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  iconSize: number = 1;
  list: any;
  appUrl: string = 'http://wooltari-test-server-dev.ap-northeast-2.elasticbeanstalk.com/profile/2/pets/';
  pets: pet[];
  petCount: number;
  constructor( private http: HttpClient) { }


  ngOnInit() {
    this.getPetList();
  }

  getPetList() {
    this.http.get<list>(this.appUrl)
      .subscribe(list => {
        this.list = list;
        this.pets = this.list.pets;
        this.petCount = this.pets.length;
        console.log('[list]', list);
        console.log('[pet-list]', this.pets);
        console.log('[pet-count]', this.petCount);
      },
      err => console.log(err.status, err.url),
      () => console.log('Done'));
  }
}