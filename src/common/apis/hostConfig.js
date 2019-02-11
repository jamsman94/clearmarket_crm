const { location } = window
const hostname = location.hostname.replace(/\..*/, '')
const apiObj = {
  'prod': 'http://192.168.0.65:10355/',
  'test': 'https://cm-api.tophold.com/'
}
const crmUrl = 'http://139.196.173.182:10255/'

let [baseURL, wsMarket, wsTrade, tradeApi, marketApi, kLineApi] = ['']

console.log(hostname)
switch (hostname) {
  // TODO: change trade-h5 to prod host
  case 'cm-crm':
    baseURL = apiObj['prod']
    break
  default:
    baseURL = apiObj['test']
}
export default {
  baseURL,
  wsMarket,
  wsTrade,
  tradeApi,
  marketApi,
  kLineApi,
  crmUrl
}
