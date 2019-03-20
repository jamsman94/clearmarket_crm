import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {PlatformInfoService} from '../../../service/platform-info.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  username: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private platformInfo: PlatformInfoService,
    private notificationService: NzNotificationService
  ) { }

  ngOnInit() {
    this.username = this.tokenService.userName;
    if (this.tokenService.token === null || this.tokenService.token === undefined) {
      this.notificationService.error(
        'token已过期',
        '请重新登录'
      );
      this.logout();
    }
  }
  logout() {
    this.tokenService.clear();
    this.platformInfo.clear();
    this.router.navigateByUrl('/passport/login');
  }
}
