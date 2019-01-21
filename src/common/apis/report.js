const reportCreate = (ajaxinstance) => {
  const report = {}
  // 查询平台report信息
  report.queryReport = (postData) => {
    return ajaxinstance.post('/ureport/query', postData)
  }

  report.platformList = (postData) => {
    return ajaxinstance.post('/platform/list/all', postData)
  }
  return report
}

export default reportCreate
