import config from './hostConfig'
const { tradeApi, kLineApi } = config
const marketCreate = (ajaxinstance) => {
  const market = {}
  // 实盘交易产品列表
  market.products = (postData) => {
    return ajaxinstance().get(`products`, { params:postData })
  }
  // 实盘交易产品列表简要信息不分页用来客户端本地缓存
  market.productsListRuby = (postData) => {
    return ajaxinstance().get(`products/list`, { params:postData })
  }
  // 所有产品的配置
  market.productList = (postData) => {
    return ajaxinstance(tradeApi).get(`product/list`, { params: postData })
  }
  // 自选列表
  market.productLikes = (postData) => {
    return ajaxinstance().get(`products/likes`, { params: postData })
  }
  // k线的请求
  market.kLine = (postData) => {
    const { productCode, type, count } = postData
    // return ajaxinstance(kLineApi).get(`kline/${productCode}/${type}?st=${st || ''}&count=${count || ''}`)
    return ajaxinstance(kLineApi).get(`kline/${productCode}/${type}?count=${count || 1000}`)
  }
  // 获取用户持仓
  market.holdAccount = (postData) => {
    return ajaxinstance(tradeApi).get(`account/hold/${postData.code}`)
  }
  // 获取用户持仓详情 /account/hold/{productCode}
  market.holdProductCode = (postData) => {
    const { productCode } = postData
    return ajaxinstance(tradeApi).get(`account/hold/${productCode}`)
  }
  // 获取委托单
  market.trustList = (postData) => {
    return ajaxinstance(tradeApi).get(`order/trust/list`, { params: postData })
  }
  // 获取用户订单
  market.orderList = (postData) => {
    return ajaxinstance(tradeApi).get(`order/history/list`, { params: postData })
  }
  // 获取用户账户基本信息()
  market.UserBaseInfoermation = (postData) => {
    return ajaxinstance(tradeApi).get(`account`, { params: postData })
  }

  return market
}

export default marketCreate
