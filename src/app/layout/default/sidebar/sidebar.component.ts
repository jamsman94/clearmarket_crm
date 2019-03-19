import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {PlatformInfoService} from '../../../service/platform-info.service';

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
    private platformInfo: PlatformInfoService
  ) { }

  ngOnInit() {
    this.username = this.tokenService.userName;
  }
  logout() {
    this.tokenService.clear();
    this.platformInfo.clear();
    this.router.navigateByUrl('/passport/login');
  }
}
