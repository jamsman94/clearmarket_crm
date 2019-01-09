// import config from './hostConfig'
// const { tradeApi } = config
const czqkCreate = (ajaxinstance) => {
  const czqk = {}

  // 充值列表
  czqk.depositsList = (postData) => {
    return ajaxinstance().get(`deposits`, { params: postData })
  }
  // 取消自选
  // czqk.canselProducts = (postData) => {
  //   return ajaxinstance().delete(`likes`, { params: postData })
  // }

  return czqk
}

export default czqkCreate
