import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../../service/token.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../../common/API';
import {forEach} from '@angular/router/src/utils/collection';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartType} from 'chart.js';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less']
})
export class AnalysisComponent implements OnInit {
  renderList: [] = [];
  tradeAmount: number[] = [];
  barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public tradeAmountData: ChartDataSets[] = [
    { data: this.tradeAmount, label: '交易数量'}
  ]

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryTxAnalysisByPage(1);
  }
  queryTxAnalysisByPage(pg: number) {
    const queryBody = {
      page: pg,
      platformId: this.tokenService.platform
    };
    this.http.post(
      test_api_addr.txAnalysis,
      queryBody
    )
      .subscribe((data: any) => {
        if (data.data !== undefined) {
          // this.tradeAmount = [];
          // this.barChartLabels = [];
          for (let items of data.data) {
            this.tradeAmount.push(items.qty);
            this.barChartLabels.push(items.productCode);
          }
          this.tradeAmountData = [
            {data: this.tradeAmount, label: '交易数量'}
          ];
        }
      });
  }

}
