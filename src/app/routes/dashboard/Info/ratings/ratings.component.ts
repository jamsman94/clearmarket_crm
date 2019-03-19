import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../../service/token.service';
import {HttpClient} from '@angular/common/http';
import {test_api_addr} from '../../../../common/API';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.less']
})
export class RatingsComponent implements OnInit {
  renderList = [];
  loading = true;
  total = 1;

  constructor(
    public tokenService: TokenService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.queryRatingsInfo(1);
  }
  queryRatingsInfo(pg: number) {
    this.loading = true;
    const queryBody = {
      page: pg,
      platformId: this.tokenService.platform
    };
    this.http.post(
      test_api_addr.ratings,
      queryBody
    )
      .subscribe((data: any) => {
        this.renderList = data.data;
        this.loading = false;
        this.total = data.total;
      });
  }

}
