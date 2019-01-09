const listsCreate = (ajaxinstance) => {
  const lists = {}
  // 收益高手
  lists.ranksLists = (postData) => {
    return ajaxinstance.get('ranks', { params: postData })
  }
  // 常胜高手
  lists.rankswinLists = (postData) => {
    return ajaxinstance.get('ranks/win', { params: postData })
  }
  // 好友的实盘交易列表
  lists.followeeOrders = (postData) => {
    return ajaxinstance.get('users/followee_orders', { params: postData })
  }

  //  关注一个用户
  lists.followPeople = (postData) => {
    return ajaxinstance.post(`users/${postData.id}/follow`)
  }
  // 取消关注一个用户
  lists.unfollowPeople = (postData) => {
    return ajaxinstance.delete(`users/${postData.id}/unfollow`)
  }

  return lists
}

export default listsCreate
