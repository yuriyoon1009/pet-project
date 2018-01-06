import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';
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

@Component({
  selector: 'app-root',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})


export class HospitalComponent implements OnInit {

  cardList: any;
  currentLocation: any;
  login: Login[];
  title: string;
  // zoom level
  zoom: number;
  // start position
  lat: number;
  lng: number;
  markers: Marker[];

  cardLists: any;
  constructor(
    private http: HttpClient,
    private hospt: HospitalService) {

    }
  ngOnInit() {
    this.currentLocation = {
      lat: 37.516143,
      lng: 127.019524
    };
    if (this.hospt.getHosipital(this.currentLocation)) {
      this.cardList = this.hospt.getHosipital(this.currentLocation);
      console.log(this.cardList);
    }

    this.title = 'Map';
    this.zoom = 10;
    this.lat = 51.678418;
    this.lng = 7.809007;

    this.cardLists = [
      {
        title: '튼튼동물병원',
        img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      },
      {
        title: '튼튼동물병원',
        img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      },
      {
        title: '튼튼동물병원',
        img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      },
      {
        title: '튼튼동물병원',
        img: '../../../assets/img/img1.jpg',
        tel: '02-2063-9859',
        address: '서울시 강남구 신사동'
      }
    ];

    this.markers = [
      {
        name: '동물병원1',
        lat: 51.678418,
        lng: 7.929007,
      },
      {
        name: '동물병원2',
        lat: 51.678418,
        lng: 7.759007,
      },
      {
        name: '동물병원3',
        lat: 51.678418,
        lng: 7.349007,
      }
    ];
  }
}

/*
app.get('/', (req, res) => res.json('Hello World!'));
app.get('/todos', (req, res) => {
  console.log('---------------------------------');
  console.log('GET /todos');
  console.log('---------------------------------');
  const todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'Angular', completed: false }
  ];
  res.json({ todos });
});
app.post('/todos', (req, res) => {
  console.log('---------------------------------');
  console.log('POST /todos');
  console.log('[PAYLOAD]', req.body);
  console.log('---------------------------------');
  res.json({ result: true });
});
app.patch('/todos/id/:id', (req, res) => {
  console.log('---------------------------------');
  console.log('PATCH /todos/id/:id');
  console.log('[REQUEST PARAMS]', req.params);
  console.log('[PAYLOAD]', req.body);
  console.log('---------------------------------');
  res.json({ result: false, message: '해당 todo가 없습니다' });
});
app.delete('/todos/id/:id', (req, res) => {
  console.log('---------------------------------');
  console.log('DELETE /todos/id/:id');
  console.log('[REQUEST PARAMS]', req.params);
  console.log('---------------------------------');
  res.json({ result: true });
});
 */

/* import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})

// OnChanges
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
*/