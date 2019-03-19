import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../../service/token.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../../common/API';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  renderList = [];
  loading = true;
  total = 0;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryByPage(1);
  }
  queryByPage(pgNum: number) {
    const queryBody = {
      page: pgNum,
      platformId: this.tokenService.platform
    };
    this.http.post(
      test_api_addr.txHistory,
      queryBody
    )
      .subscribe((data: any) => {
        this.renderList = data.data;
        this.total = data.total;
        this.loading = false;
      });
  }

}
