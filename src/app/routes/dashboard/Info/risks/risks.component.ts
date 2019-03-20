import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risks',
  templateUrl: './risks.component.html',
  styleUrls: ['./risks.component.less']
})
export class RisksComponent implements OnInit {
  renderList = [];
  total = 0;


  constructor() { }

  ngOnInit() {
  }

}
