import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzModalRef, NzModalService} from 'ng-zorro-antd';
import {TokenService} from '../../../service/token.service';
import {test_api_addr} from '../../../common/API';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlatformInfoService} from '../../../service/platform-info.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.less']
})
export class RoleComponent implements OnInit {
  renderList = [];
  loading = true;
  total: number;
  tplModal: NzModalRef;
  createForm: FormGroup;
  editForm: FormGroup;
  editPlatId: number;
  platformList = [{
    platformId: this.tokenService.platform,
    reName: this.platformInfo.platformRename
  }];

  constructor(
    private http: HttpClient,
    private modalService: NzModalService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private platformInfo: PlatformInfoService
  ) { }

  ngOnInit() {
    this.queryRole(1);
    this.createForm = this.fb.group({
      roleName: [ null, [ Validators.required ] ],
      platformId: [ null, [ Validators.required ] ],
      roleType: [ null, [ Validators.required ] ],
      dsc: [ null, [ Validators.required ] ]
    });
    this.editForm = this.fb.group({
      roleName: [ null, [ Validators.required ] ],
      platformId: [ null, [ Validators.required ] ],
      roleType: [ null, [ Validators.required ] ],
      dsc: [ null, [ Validators.required ] ]
    });
  }
  handleNew(template) {
    this.queryPlatformList();
    this.tplModal = this.modalService.create({
      nzTitle: '新建权限组',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.createRole();
        this.createForm.reset();
      }))
    });
  }
  queryRole(pg: number) {
    this.loading = true;
    const requestBody = {
      page: pg,
      platformId: this.tokenService.platform
    };
    this.http.post(
      test_api_addr.queryRole,
      requestBody
    ).subscribe((data: any) => {
      this.renderList = data.data;
      this.loading = false;
      this.total = data.total;
    });
  }
  createRole() {
    const queryBody = {
      roleName: this.createForm.value.roleName,
      platformId: this.createForm.value.platformId,
      roleList: '100000',
      descr: this.createForm.value.dsc,
      roleType: +this.createForm.value.roleType
    };
    this.http.post(
      test_api_addr.createRole,
      queryBody
    ).subscribe(() => {
      this.queryRole(1);
      return 0;
    });
  }
  handleEdit(platId, roleId, template) {
    this.editPlatId = platId;
    this.editForm.patchValue({
      platformId: platId
    });
    this.tplModal = this.modalService.create({
      nzTitle: '修改权限组',
      nzContent: template,
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.updateRole(roleId);
        this.editForm.reset();
      }))
    });
  }
  updateRole(id) {
    const queryBody = {
      roleName: this.editForm.value.roleName,
      platformId: this.editForm.value.platformId,
      roleList: '100000',
      descr: this.editForm.value.dsc,
      roleType: +this.editForm.value.roleType
    };
    this.http.put(
      test_api_addr.updateRole + '/' + id,
      queryBody
    ).subscribe(() => {
      this.queryRole(1);
      return 0;
    });
  }
  handleDelete(platId, roleId) {
    this.modalService.info({
      nzTitle: '将要删除权限组',
      nzContent: '权限组的所有信息将会被删除，此操作不可撤销，请确认！',
      nzOnOk: () => new Promise((resolve => {
        setTimeout(resolve, 1000);
        this.http.delete(
          test_api_addr.deleteRole + '/' + platId + '/' + roleId
        ).subscribe(() => {
          this.queryRole(1);
        });
      }))
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
}
