const { location } = window
const hostname = location.hostname.replace(/\..*/, '')
const apiObj = {
  'prod': 'https://api-v2.tophold.com/api/v2/',
  'test': 'https://staging.tophold.com/api/v2/'
}
// ws协议
const wsConfig = {
  wsMarket: {
    test: 'ws://106.15.36.19:8990/websocket',
    prod: 'wss://market-prod.tophold.com'
  },
  wsTrade: {
    test: 'ws://106.15.36.19:8989/websocket',
    prod: 'wss://trade-prod.tophold.com'
  }
}
// java的api
const javaApi = {
  trade: {
    test: 'http://106.15.36.19:8889/',
    prod: 'https://api-prod-trade.tophold.com/'
  },
  market: {
    test: 'http://139.196.173.182:8700/',
    prod: 'https://api-prod-market.tophold.com/'
  },
  kLineApi: {
    test: 'http://139.196.173.182:8700/',
    prod: 'https://api-prod-market.tophold.com/'
  }
}
let [baseURL, wsMarket, wsTrade, tradeApi, marketApi, kLineApi] = ['']
switch (hostname) {
  case 'trade-h5':
    baseURL = apiObj['prod']
    wsMarket = wsConfig.wsMarket.prod
    wsTrade = wsConfig.wsTrade.prod
    tradeApi = javaApi.trade.prod
    marketApi = javaApi.market.prod
    kLineApi = javaApi.kLineApi.prod
    break
  case 'trade-h5-test':
    baseURL = apiObj['test']
    wsMarket = wsConfig.wsMarket.prod
    wsTrade = wsConfig.wsTrade.prod
    tradeApi = javaApi.trade.prod
    marketApi = javaApi.market.prod
    kLineApi = javaApi.kLineApi.prod
    break
  default:
    baseURL = apiObj['test']
    wsMarket = wsConfig.wsMarket.test
    wsTrade = wsConfig.wsTrade.test
    tradeApi = javaApi.trade.test
    marketApi = javaApi.market.test
    kLineApi = javaApi.kLineApi.test
    // baseURL = apiObj['trade']
    // wsMarket = wsConfig.wsMarket.prod
    // wsTrade = wsConfig.wsTrade.prod
    // tradeApi = javaApi.trade.prod
    // marketApi = javaApi.market.prod
    // kLineApi = javaApi.kLineApi.prod
}
export default {
  baseURL,
  wsMarket,
  wsTrade,
  tradeApi,
  marketApi,
  kLineApi
}
