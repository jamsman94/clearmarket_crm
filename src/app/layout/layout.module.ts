import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';
import { PassportComponent } from './passport/passport.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { SidebarNavComponent } from './default/sidebar-nav/sidebar-nav.component';

@NgModule({
  declarations: [PassportComponent, DefaultComponent, HeaderComponent, SidebarComponent, SidebarNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [
    PassportComponent,
    DefaultComponent
  ]
})
export class LayoutModule { }
