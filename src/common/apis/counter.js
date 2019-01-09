const loginCreate = (ajaxinstance) => {
  const counter = {}

  counter.getdata = (postData) => {
    return ajaxinstance.post('tomato_login?username=' + postData.username + '&password=' + postData.password, postData)
  }
  counter.llala = (postData) => {
    return ajaxinstance.get('validateTicket', { params:postData })
  }
  // 获取微信的
  counter.anticon = (postData) => {
    return ajaxinstance.post('wechat/getJsapiSignRest?url=' + postData)
  }
  return counter
}

export default loginCreate
