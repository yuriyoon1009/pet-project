import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-state',
  templateUrl: './pet-state.component.html',
  styleUrls: ['./pet-state.component.scss']
})
export class PetStateComponent implements OnInit {
  stateForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.stateForm = this.fb.group({
      currentWeight: ['', Validators.required],
      goalWeight: ['', Validators.required],
      neckSize: ['', Validators.required],
      chestSize: ['', Validators.required]
    });
  }
}
