import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../../../service/token.service';
import {test_api_addr} from '../../../common/API';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzModalRef, NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.less']
})
export class PlatformComponent implements OnInit {
  renderList = [];
  loading = true;
  total = 1;
  editForm: FormGroup;
  createForm: FormGroup;
  tplModal: NzModalRef;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private notificationService: NzNotificationService
  ) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      platformCnName: [ null, [ Validators.required ] ],
      platformEnName: [ null, [ Validators.required ] ],
    });
    this.createForm = this.fb.group({
      platformCnName: [ null, [ Validators.required ] ],
      platformEnName: [ null, [ Validators.required ] ],
      reName: [ null, [ Validators.required ] ]
    });
    this.queryPlatform(1);
  }
  queryPlatform(pg: number) {
    this.loading = true;
    const queryBody = {
      page: pg
    };
    this.http.post(
      test_api_addr.queryPlatInfo,
      queryBody
    )
      .subscribe((data: any) => {
        this.renderList = data.data;
        this.total = data.total;
        this.loading = false;
      });
  }
  handleEdit(reName, platformId, formTemplate) {
    this.tplModal = this.modalService.create({
      nzTitle: '修改平台信息',
      nzContent: formTemplate,
      nzOnOk: () => new Promise((resolve => {
          setTimeout(resolve, 1000);
          this.updatePlatInfo(reName, platformId);
        }))
    });
  }
  updatePlatInfo(name, platId) {
    const queryBody = {
      platformCnName: this.editForm.value.platformCnName,
      platformEnName: this.editForm.value.platformEnName,
      platformId: platId,
      reName: name
    };
    console.log(queryBody);
    this.http.put(
      test_api_addr.updatePlatInfo,
      queryBody
    ).subscribe((data) => {
      this.queryPlatform(1);
    });
  }
  handleDelete(platId) {
    this.modalService.info({
      nzTitle: '将要删除平台',
      nzContent: '平台的所有信息将会被删除，此操作不可撤销，请确认！',
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.http.delete(
          test_api_addr.deletePlatEntry + '/' + platId
        ).subscribe((data: any) => {
          if (data.status === 1) {
            this.notificationService.success(
              '操作成功',
              '平台已删除'
            );
          }
          this.queryPlatform(1);
        });
      }))
    });
  }
  handleNew(template) {
    this.tplModal = this.modalService.create({
      nzTitle: '新建平台',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.http.post(
          test_api_addr.savePlatInfo,
          this.createForm.value
        ).subscribe((data) => {
          this.queryPlatform(1);
        });
      }))
    });
  }
}
