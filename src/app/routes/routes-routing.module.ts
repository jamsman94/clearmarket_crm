import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassportComponent } from '../layout/passport/passport.component';
import { LoginComponent } from './passport/login/login.component';
import { DefaultComponent } from '../layout/default/default.component';
import {DashboardComponent} from './dashboard/dashboard/dashboard.component';
import {HistoryComponent} from './dashboard/transaction/history/history.component';
import {AnalysisComponent} from './dashboard/transaction/analysis/analysis.component';
import {RatingsComponent} from './dashboard/Info/ratings/ratings.component';
import {ContactComponent} from './dashboard/contact/contact.component';
import {PlatformComponent} from './dashboard/platform/platform.component';
import {RoleComponent} from './dashboard/role/role.component';
import {CertificateComponent} from './dashboard/certificate/certificate.component';
import {VerificationComponent} from './dashboard/Info/verification/verification.component';
import {UserComponent} from './dashboard/user/user.component';
import {ReportComponent} from './dashboard/Info/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'analysis', component: AnalysisComponent },
      { path: 'ratings', component: RatingsComponent },
      { path: 'contact', component: ContactComponent},
      { path: 'platform', component: PlatformComponent},
      { path: 'role', component: RoleComponent},
      { path: 'certificate', component: CertificateComponent },
      { path: 'verification', component: VerificationComponent },
      { path: 'user', component: UserComponent },
      { path: 'ureport', component: ReportComponent}
    ]
  },
  {
    path: 'passport',
    component: PassportComponent,
    children: [
      { path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
