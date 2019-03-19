import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as sha256 from 'sha256';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {test_api_addr} from '../../../common/API';
import {PlatformInfoService} from '../../../service/platform-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  onSubmit() {
    let password = this.loginForm.get('oprPwd').value;
    password = sha256(password);
    this.loginForm.patchValue({ oprPwd: password });
    this.http.post(
      test_api_addr.login,
      this.loginForm.value
    )
      .subscribe((data: any) => {
        this.tokenService.setToken(data.data.token);
        this.tokenService.setUserName(data.data.usrName);
        this.tokenService.setPlatform(data.data.platform);
        this.tokenService.updateTime = data.data.updateTime;
        this.platformInfo.platformEnName = data.data.platformEnName;
        this.platformInfo.platformCnName = data.data.platformCnName;
        this.platformInfo.platformRename = data.data.rename;
        this.router.navigateByUrl('/dashboard');
      });
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private platformInfo: PlatformInfoService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      oprId: [ null, [ Validators.required ] ],
      oprPwd: [ null, [ Validators.required ] ],
      platformId: [null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

}
