const contactCreate = (ajaxinstance) => {
  const contact = {}
  // 查询当前平台的contact info
  contact.queryContacts = (postData) => {
    return ajaxinstance.post('/contact/query', postData)
  }
  return contact
}

export default contactCreate
