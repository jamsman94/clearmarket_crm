import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { RoutesModule } from './routes/routes.module';
import zh from '@angular/common/locales/zh';
// 页面结构
import {LayoutModule} from './layout/layout.module';
// 拦截器引入
import {TokenInterceptor} from './service/interceptor/token.Interceptor';
import {ErrorInterceptor} from './service/interceptor/error.Interceptor';

registerLocaleData(zh);

// Interceptors list
const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoutesModule,
    LayoutModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    ...INTERCEPTORS
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
