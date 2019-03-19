import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.less']
})
export class SidebarNavComponent implements OnInit {
  platform: number;

  constructor(
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.platform = this.tokenService.platform;
  }

}
