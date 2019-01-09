import React from 'react'
import propTypes from 'prop-types'
const Loading = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>页面载入中...</div>
  } else if (error) {
    return <div>页面加载失败！</div>
  } else {
    return null
  }
}
Loading.propTypes = {
  isLoading:propTypes.bool,
  error:propTypes.any
}

export default Loading
