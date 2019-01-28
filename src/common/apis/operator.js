const operatorCreate = (ajaxinstance) => {
  const operator = {}

  operator.queryOperator = (postData) => {
    return ajaxinstance.post('/operator/query', postData)
  }

  operator.changePwd = (postData) => {
    return ajaxinstance.post('/operator/pwd', postData)
  }

  operator.newOperator = (postData) => {
    return ajaxinstance.post('/operator/save', postData)
  }

  operator.updateOperator = (postData) => {
    return ajaxinstance.put('/operator/upd', postData)
  }

  operator.deleteOperator = (postData) => {
    return ajaxinstance.delete(`/operator/del/${postData.platformId}/${postData.oprId}`)
  }
  return operator
}

export default operatorCreate
