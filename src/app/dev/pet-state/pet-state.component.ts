import { environment } from './../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-state',
  templateUrl: './pet-state.component.html',
  styleUrls: ['./pet-state.component.scss']
})

export class PetStateComponent implements OnInit {
  stateForm: FormGroup;
  appUrl = environment.apiUrl;
  CurrentWeight: string;
  GoalWeight: string;
  NeckSize: string;
  ChestSize: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.stateForm = this.fb.group({
      currentWeight: ['', Validators.required],
      goalWeight: ['', Validators.required],
      neckSize: ['', Validators.required],
      chestSize: ['', Validators.required]
    });
    // API 완성되면 풀어야 함
    // this.getPetState();
    this.setForm();
  }

  setForm() {
    this.CurrentWeight = '16';
    this.GoalWeight = '16';
    this.NeckSize = '16';
    this.ChestSize = '16';
    this.stateForm.setValue({
      currentWeight: this.CurrentWeight,
      goalWeight: this.GoalWeight,
      neckSize: this.NeckSize,
      chestSize: this.ChestSize
    });
  }

  getPetState() {
    this.http.get(`${this.appUrl}/정해지면 넣자`, { observe: 'response' })
      .subscribe(res => {
        console.log(res);
        return res;
      });
  }

  editState() {
    console.log('hello Angular');
  }
}
