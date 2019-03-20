import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../../service/token.service';
import {PlatformInfoService} from '../../../../service/platform-info.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../../common/API';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  total = 0;
  renderList = [];
  loading = true;

  constructor(
    private tokenService: TokenService,
    private infoService: PlatformInfoService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryReportByPage(1);
  }
  queryReportByPage(pg: number) {
    this.loading = true;
    const queryBody = {
      page: pg,
      pageSize: 5,
      rename: this.infoService.platformRename
    };
    this.http.post(
      test_api_addr.userReport,
      queryBody
    ).subscribe((data: any) => {
      this.loading = false;
      this.renderList = data.data;
      this.total = data.total;
    });
  }

}
