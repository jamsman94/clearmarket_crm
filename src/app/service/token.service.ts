import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string;
  platform: number;
  userName: string;
  roleId: number;
  functions: string;
  updateTime: number;
  constructor() { }
  setToken(token: string) {
    this.token = token;
  }
  setUserName(usrName: string) {
    this.userName = usrName;
  }
  setPlatform(platNum: number) {
    this.platform = platNum;
  }
  clear() {
    this.token = null;
    this.platform = null;
    this.userName = null;
    this.roleId = null;
    this.functions = null;
    this.updateTime = null;
  }
}
