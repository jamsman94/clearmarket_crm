// 基础API地址
// TODO 增加环境判断条件
// const base_url = '139.196.173.182:10355';
// const certificate_base_api = '192.168.1.44:10248';
// const certificate_base_api = '106.15.36.19:10248';
const certificate_base_api = 'cm-crm-api-caesar.tophold.com';
// const base_url = '192.168.1.44:8080';
const base_url = 'cm-crm-api.tophold.com';
// 具体API列表
export const test_api_addr = {
  login: base_url + '/login',
  queryPlatInfo: base_url + '/platform/query',
  savePlatInfo: base_url + '/platform/save',
  updatePlatInfo: base_url + '/platform/upd',
  deletePlatEntry: base_url + '/platform/del',
  platformList: base_url + '/platform/list/',
  platformAll: base_url + '/platform/list/all',
  dashboard: base_url + '/dashboard',
  txHistory: base_url + '/tradeTxn/query',
  txAnalysis: base_url + '/tradeTxn/tradeAnalysis',
  ratings: base_url + '/rateTxn/query',
  contact: base_url + '/contact/query',
  contactUpdate: base_url + '/contact/edit',
  queryRole: base_url + '/role/query',
  createRole: base_url + '/role/save',
  updateRole: base_url + '/role/upd',
  deleteRole: base_url + '/role/del',
  queryVerification: base_url + '/report/verify',
  userReport: base_url + '/ureport/query',
  userReportGraph: base_url + '/ureport/chart',
  operatorQuery: base_url + '/operator/query',
  operatorPassword: base_url + '/operator/pwd',
  createOperator: base_url + '/operator/save',
  updateOperator: base_url + '/operator/upd',
  deleteOperator: base_url + '/operator/del',
  roleList: base_url + '/role/list'
};
export const certificate_api = {
  query: certificate_base_api + '/certificate/query',
  create: certificate_base_api + '/certificate/create',
  download: certificate_base_api + '/certificate/download',
  extend: certificate_base_api + '/certificate/extend'
};
