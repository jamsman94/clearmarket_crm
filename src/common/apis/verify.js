const verifyCreate = (ajaxinstance) => {
  const verify = {}
  // GET 平台的verify数据
  verify.getVerifyData = () => {
    return ajaxinstance.get('/report/verify')
  }
  return verify
}

export default verifyCreate
