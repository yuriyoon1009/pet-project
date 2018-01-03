import { RequestServerService } from './../../services/request-server.service';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {

  /* http server */
  url = 'https://wootari-test-server-dev.ap-northeast-2.elasticbeanstalk.com';
  pet: any;
  // 의료정보 입력폼, Validations
  myForm: FormGroup;

  constructor( 
    private fb: FormBuilder,
    public http: HttpClient,
    private modalService: BsModalService,
    private hospt: RequestServerService
  ) {
    console.log(this.url);
   }

  get date() {
    return this.myForm.get('date');
  }

  get description() {
    return this.myForm.get('description');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'date': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(300)])]
    });
    this.http.get(`${this.url}/profile/1/`, { observe: 'response' })
      .subscribe((res) => console.log(res.body));
  }

  onSubmit() {
    console.log(this.myForm);

    this.myForm.reset();
  }

  //삭제 버튼팝업
  modalRef: BsModalRef;
  message: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
