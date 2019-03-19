import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../common/API';
import {PlatformInfoService} from '../../../service/platform-info.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public barChartLabels: Label[] = ['USDMXN', 'USDCAD', 'NZDUSD', 'GOLD', 'EURGBP'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public doughnutChartLabels: Label[] = ['TA', 'TB', 'TC', 'TD', 'TH'];

  public doughnutChartData: MultiDataSet = [
    [1, 1, 30, 22, 45]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public barChartData: ChartDataSets[] = [
    { data: [120000, 5000, 4000, 3000, 2000], label: '交易次数' },
  ];
  constructor(
    public tokenService: TokenService,
    public platformInfo: PlatformInfoService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.updateDashboardInfo();
  }
  updateDashboardInfo() {
    this.http.post(
      test_api_addr.dashboard + '/' + this.tokenService.platform,
      null
    )
      .subscribe((data: any) => {
        this.platformInfo.userProp = data.data.userProp;
        this.platformInfo.platformCount = data.data.platformCount;
        this.platformInfo.verifyCount = data.data.verifyCount;
        this.platformInfo.highRiskUser = data.data.highRiskUser;
        this.platformInfo.riskUser = data.data.riskUser;
        this.platformInfo.reportCount = data.data.reportCount;
        this.platformInfo.reportProp = data.data.reportProp;
      });
  }

}
