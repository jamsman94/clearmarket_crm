import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {TokenService} from '../../../service/token.service';
import {test_api_addr} from '../../../common/API';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlatformInfoService} from '../../../service/platform-info.service';
import * as sha256 from 'sha256';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  renderList = [];
  platformList = [{
    platformId: this.tokenService.platform,
    reName: this.platformInfo.platformRename
  }];
  total = 0;
  roleList = [];
  loading = true;
  nextSelect = true;
  createForm: FormGroup;
  editForm: FormGroup;
  passwordForm: FormGroup;
  editOprId: string;
  editPlatId: number;

  constructor(
    private http: HttpClient,
    private modalService: NzModalService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private platformInfo: PlatformInfoService,
    private notificationService: NzNotificationService
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      oprId: [ null, [ Validators.required ] ],
      oprPwd: [ null, [ Validators.required ] ],
      platformId: [ null, [ Validators.required ] ],
      roleId: [ null, [ Validators.required ] ],
      oprDsc: [ null, [ Validators.required ] ]
    });
    this.editForm = this.fb.group({
      oprDsc: [ null, [ Validators.required ] ],
      oprId: [ null, [ Validators.required ] ],
      platformId: [ null, [ Validators.required ] ],
      roleId: [ null, [ Validators.required ] ],
    });
    this.passwordForm = this.fb.group({
      newPwd: [ null, [ Validators.required ] ],
      oprId: [ null, [ Validators.required ] ],
      platformId: [ null, [ Validators.required ] ],
      oldPwd: [ null, [ Validators.required ] ],
    });
    this.queryUserByPage(1);
  }
  queryUserByPage(pg: number) {
    const queryBody = {
      page: pg,
      platformId: this.tokenService.platform
    };
    this.http.post(
      test_api_addr.operatorQuery,
      queryBody
    ).subscribe((data: any) => {
      this.renderList = data.data;
      this.loading = false;
      this.total = data.total;
    });
  }
  handleNew(template) {
    this.queryPlatformList();
    this.modalService.create({
      nzTitle: '创建信操作员',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.createNewOperator();
      }))
    });
  }
  createNewOperator() {
    const requestBody = {
      oprDsc: this.createForm.value.oprDsc,
      oprId: this.createForm.value.oprId,
      oprPwd: sha256(this.createForm.value.oprPwd),
      platformId: +this.createForm.value.platformId,
      roleId: +this.createForm.value.roleId,
    };
    this.http.post(
      test_api_addr.createOperator,
      requestBody
    ).subscribe(() => {
      this.queryUserByPage(1);
      this.createForm.reset();
    });
  }
  queryPlatformList() {
    if (this.tokenService.platform === 1000) {
      this.http.get(
        test_api_addr.platformAll
      ).subscribe((data: any) => {
        this.platformList = data.data;
      });
    } else {
      this.http.get(
        test_api_addr.platformList + '/' + this.tokenService.platform
      ).subscribe((data: any) => {
        this.platformList = data.data;
      });
    }
  }
  queryRoleList(platformId) {
    this.http.get(
      test_api_addr.roleList + '/' + platformId
    ).subscribe((data: any) => {
      this.roleList = data.data;
    });
    this.nextSelect = false;
  }
  handleEdit(template, oprId, platId) {
    this.editOprId = oprId;
    this.editPlatId = platId;
    this.queryRoleList(platId);
    this.modalService.create({
      nzTitle: '修改操作员',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.updateOperator();
      }))
    });
  }
  updateOperator() {
    const requestBody = {
      oprDsc: this.editForm.value.oprDsc,
      oprId: this.editOprId,
      platformId: +this.editPlatId,
      roleId: +this.editForm.value.roleId
    };
    this.http.put(
      test_api_addr.updateOperator,
      requestBody
    ).subscribe(() => {
      this.queryUserByPage(1);
      this.editForm.reset();
    });
  }
  handlePwdChange(template, editplat, editId) {
    this.editOprId = editId;
    this.editPlatId = editplat;
    this.modalService.create({
      nzTitle: '修改操作员密码',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.updatePassword();
      }))
    });
  }
  updatePassword() {
    const requestBody = {
      oprId: this.editOprId,
      platformId: this.editPlatId,
      oldPwd: sha256(this.passwordForm.value.oldPwd),
      newPwd: sha256(this.passwordForm.value.newPwd)
    };
    this.http.post(
      test_api_addr.operatorPassword,
      requestBody
    ).subscribe((data: any) => {
      if (data.status === 1) {
        this.notificationService.success(
          '操作成功',
          '密码已更改'
        );
      }
      this.queryUserByPage(1);
      this.passwordForm.reset();
    });
  }
  handleDelete(platId, oprId) {
    this.modalService.info({
      nzTitle: '将要删除操作员',
      nzContent: '该操作员将会被删除，此操作不可撤销，请确认！',
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.http.delete(
          test_api_addr.deleteOperator + '/' + platId + '/' + oprId
        ).subscribe((data: any) => {
          if (data.status === 1) {
            this.notificationService.success(
              '操作成功',
              '操作员已删除'
            );
          }
          this.queryUserByPage(1);
        });
      }))
    });
  }
}
