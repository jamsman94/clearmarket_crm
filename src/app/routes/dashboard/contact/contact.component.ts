import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../common/API';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  renderList = [
    {
      id: 1,
      company: '2',
      email: '2',
      link: null,
      name: '2',
      msg: '2',
      createTime: 1547109584227,
      updateTime: 1548298810239,
      flag: true,
      process: '',
      renderedFlag: '',
    }
  ];
  loading = true;
  total = 1;
  editForm: FormGroup;
  tplModal: NzModalRef;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private fb: FormBuilder,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      editMessage: [ null, [ Validators.required ] ]
    });
    this.queryContactInfo(1);
  }
  queryContactInfo(pg: number) {
    this.loading = true;
    const queryBody = {
      page: pg
    }
    this.http.post(
      test_api_addr.contact,
      queryBody
    )
      .subscribe((data: any) => {
        this.total = data.total;
        this.renderList = data.data;
        for (let segment of this.renderList) {
          if (segment.flag === true) {
            segment['renderedFlag'] = '已处理，处理信息：' + segment.process;
          } else {
            segment['renderedFlag'] = '未处理';
          }
        }
        this.loading = false;
      });
  }
  updateContactConfirm(template, item) {
    this.tplModal = this.modalService.create({
      nzTitle: '修改平台信息',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.updateContactInfo(item.id);
      }))
    });
  }
  updateContactInfo(id: number) {
    console.log(this.editForm.get('editMessage'));
    this.http.put(
      test_api_addr.contactUpdate + '/' + id,
      this.editForm.get('editMessage').value,
    ).subscribe(() => {
      this.queryContactInfo(1);
    });
  }
}
