const contactCreate = (ajaxinstance) => {
  const contact = {}
  // 查询当前平台的contact info
  contact.queryContacts = (postData) => {
    return ajaxinstance.post('/contact/query', postData)
  }
  contact.updateContacts = (postData) => {
    return ajaxinstance.put(`/contact/edit/${postData.id}`)
  }
  return contact
}

export default contactCreate
