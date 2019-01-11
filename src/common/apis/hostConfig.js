const { location } = window
const hostname = location.hostname.replace(/\..*/, '')
const apiObj = {
  'prod': 'https://api-v2.tophold.com/api/v2/',
  'test': 'http://139.196.173.182:10355/'
}
const crmUrl = 'http://139.196.173.182:10255/'
let [baseURL, wsMarket, wsTrade, tradeApi, marketApi, kLineApi] = ['']
switch (hostname) {
  case 'trade-h5':
    baseURL = apiObj[hostname]

    break
  case 'trade-h5-test':
    baseURL = apiObj[hostname]

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
