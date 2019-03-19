import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzModalService} from 'ng-zorro-antd';
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
    private platformInfo: PlatformInfoService
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
    });
  }
  queryPlatformList() {
    this.http.get(
      test_api_addr.platformAll
    ).subscribe((data: any) => {
      this.platformList = data.data;
      console.log(this.platformList);
    });
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
    });
  }
}
