const roleCreate = (ajaxinstance) => {
  const role = {}

  role.queryRoleList = (postData) => {
    return ajaxinstance.post('/role/query', postData)
  }

  role.newRole = (postData) => {
    return ajaxinstance.post('/role/save', postData)
  }

  role.updateRoleInfo = (id, postData) => {
    return ajaxinstance.put(`/role/upd/${id}`, postData)
  }

  role.deleteRole = (platformId, roleId) => {
    return ajaxinstance.delete(`/role/del/${platformId}/${roleId}`)
  }

  role.updateRoleList = (postData) => {
    return ajaxinstance.get(`role/list/${postData}`)
  }
  return role
}
export default roleCreate
