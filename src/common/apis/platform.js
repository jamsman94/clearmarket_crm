const platformCreate = (ajaxinstance) => {
  const platform = {}
  // 查询平台信息
  platform.queryPlatInfo = (postData) => {
    return ajaxinstance.post('/platform/query', postData)
  }

  platform.savePlatInfo = (postData) => {
    return ajaxinstance.post('/platform/save', postData)
  }

  platform.updatePlatInfo = (postData) => {
    return ajaxinstance.put('/platform/upd', postData)
  }

  return platform
}

export default platformCreate
