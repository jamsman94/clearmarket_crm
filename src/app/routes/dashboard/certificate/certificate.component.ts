import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlatformInfoService} from '../../../service/platform-info.service';
import {TokenService} from '../../../service/token.service';
import {certificate_api, test_api_addr} from '../../../common/API';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.less']
})
export class CertificateComponent implements OnInit {
  renderList = [];
  loading = true;
  total = 0;
  createForm: FormGroup;
  platformList = [];

  constructor(
    private http: HttpClient,
    public platformInfo: PlatformInfoService,
    public tokenService: TokenService,
    private notificationService: NzNotificationService,
    private fb: FormBuilder,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      city: [ null, [ Validators.required ] ],
      commonName: [ null, [ Validators.required ] ],
      vendor: [ null, [ Validators.required ] ],
    });
    this.queryCertificateByPage(1);
  }
  queryCertificateByPage(pg: number) {
    this.http.post(
      certificate_api.query,
      {
        vendor: this.platformInfo.platformRename,
        page: pg
      }
    ).subscribe((data: any) => {
      this.renderList = data.data;
      this.total = data.total;
      this.loading = false;
    });
  }
  downloadCertificate(id: string) {
    window.open('http://' + certificate_api.download + '/' + id);
  }
  extendCertificate(id: string) {
    this.http.put(
      certificate_api.extend + '/' + id,
      {}
    ).subscribe((data: any) => {
      this.queryCertificateByPage(1);
      if (data.status === 1) {
        this.notificationService.success(
          '操作成功',
          '证书延期成功'
        );
      }
    });
  }
  deleteCertificate(id: string) {
    this.notificationService.warning(
      '没这需求',
      '等有了在开发QAQ'
    );
  }
  createNewCertificate(template) {
    this.modalService.create({
      nzTitle: '颁发新证书',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.handleCreate();
        this.createForm.reset();
      }))
    });
  }
  handleCreate() {
    const requestBody = {
      city: this.createForm.value.city,
      commonName: this.createForm.value.commonName,
      vendor: this.createForm.value.vendor,
      company: 'ClearMarkets'
    };
    this.http.post(
      certificate_api.create,
      requestBody
    ).subscribe(() => {
      this.queryCertificateByPage(1);
    });
  }
  queryPlatformList() {
    this.http.get(
      test_api_addr.platformAll
    ).subscribe((data: any) => {
      this.platformList = data.data;
    });
  }
}
