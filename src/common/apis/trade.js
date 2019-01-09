// import config from './hostConfig'
// const { tradeApi } = config
const tradeCreate = (ajaxinstance) => {
  const trade = {}
  // 标记产品在线
  trade.productsOline = (postData) => {
    return ajaxinstance().post(`products/${postData.id}/online`, postData)
  }

  // 产品详情
  trade.productsDetail = (postData) => {
    return ajaxinstance().get(`products/${postData.id}`)
  }
  // 取消自选
  trade.canselProducts = (postData) => {
    return ajaxinstance().delete(`likes`, { params: postData })
  }
  // 增加自选
  trade.likeProducts = (postData) => {
    return ajaxinstance().post(`likes`, postData)
  }
  return trade
}

export default tradeCreate
