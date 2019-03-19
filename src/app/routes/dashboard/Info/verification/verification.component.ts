import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlatformInfoService} from '../../../../service/platform-info.service';
import {test_api_addr} from '../../../../common/API';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartType} from 'chart.js';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.less']
})
export class VerificationComponent implements OnInit {
  renderList = [];
  verificationAmount: number[] = [];
  barChartLabels: Label[] = ['每日认证', '每周认证', '每月认证', '总计认证'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataSets[] = [
    { data: this.verificationAmount, label: '平台认证数据统计'},
  ];

  constructor(
    private http: HttpClient,
    private platformInfo: PlatformInfoService,

  ) { }

  ngOnInit() {
    this.query();
  }
  query() {
    this.http.post(
      test_api_addr.queryVerification,
      this.platformInfo.platformRename
    ).subscribe((data: any) => {
      // this.renderList = data.data;
      // this.loading = false;
      console.log(data.data);
      this.verificationAmount = data.data.platform;
      this.barChartData = [
        { data: this.verificationAmount, label: '平台认证数据统计'},
      ];
    });
  }
}
