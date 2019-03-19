import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import {LayoutModule} from '../layout/layout.module';
import { LoginComponent } from './passport/login/login.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import {ChartsModule} from 'ng2-charts';
import { PlatformComponent } from './dashboard/platform/platform.component';
import { RatingsComponent } from './dashboard/Info/ratings/ratings.component';
import { RisksComponent } from './dashboard/Info/risks/risks.component';
import { VerificationComponent } from './dashboard/Info/verification/verification.component';
import { ReportComponent } from './dashboard/Info/report/report.component';
import { HistoryComponent } from './dashboard/transaction/history/history.component';
import { AnalysisComponent } from './dashboard/transaction/analysis/analysis.component';
import { ContactComponent } from './dashboard/contact/contact.component';
import { RoleComponent } from './dashboard/role/role.component';
import { CertificateComponent } from './dashboard/certificate/certificate.component';
import { UserComponent } from './dashboard/user/user.component';

@NgModule({
  declarations: [LoginComponent, DashboardComponent, PlatformComponent, RatingsComponent, RisksComponent, VerificationComponent,
    ReportComponent, HistoryComponent, AnalysisComponent, ContactComponent, RoleComponent, CertificateComponent, UserComponent],
  imports: [
    CommonModule,
    LayoutModule,
    RoutesRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ChartsModule,
    FormsModule
  ]
})
export class RoutesModule { }
