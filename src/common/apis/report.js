const reportCreate = (ajaxinstance) => {
  const report = {}
  // 查询平台report信息
  report.queryReport = (postData) => {
    return ajaxinstance.post('/ureport/query', postData)
  }

  return report
}

export default reportCreate
