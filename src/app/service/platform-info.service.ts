import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformInfoService {
  userProp: number;
  verifyCount: number;
  highRisk: number;
  risk: number;
  riskProp: number;
  reportCount: number;
  reportProp: number;
  platformCnName: string;
  platformEnName: string;
  platformCount: number;
  platformRename: string;
  constructor() { }
  clear() {
    this.userProp = null;
    this.verifyCount = null;
    this.highRisk = null;
    this.risk = null;
    this.reportCount = null;
    this.reportProp = null;
    this.platformCnName = null;
    this.platformEnName = null;
    this.platformCount = null;
    this.platformRename = null;
    this.riskProp = null;
  }
}
