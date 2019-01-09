import React from 'react'
import { Spin, Pagination, Icon, Modal } from 'antd'
import './component.scss'
import PropTypes from 'prop-types'

// loading
export const LoadingView = () => (
  <div className='loading-wrapper' id='loading' style={{ display:'none' }}>
    <div className='loading-container'>
      <Spin size='large' />
    </div>
  </div>
)
// 为数组添加key，防止报key warning
export const addKey = (arr) => arr.map((v, i) => {
  v.key = (i + 1)
  return v
})
// 分页组件
export const PageIng = ({ current, total, onChange, onShowSizeChange }) => {
  return (
    <div style={{ padding:'20px 0', textAlign:'right' }}>
      {total !== 0 && <Pagination
        current={current}
        total={total}
        onChange={onChange}
        showSizeChanger={!!onShowSizeChange}
        showQuickJumper={!!onShowSizeChange}
        onShowSizeChange={onShowSizeChange || null}
        />}
    </div>
  )
}
PageIng.propTypes = {
  current:PropTypes.number,
  total:PropTypes.number,
  onChange:PropTypes.func,
  onShowSizeChange:PropTypes.func,
}
// 几个弹窗
const commonModal = (news, type) => {
  Modal[type || 'info']({
    title: '提示',
    okText:'确定',
    content: (
      <div>
        {news}
      </div>
    ),
    onOk () {},
    onCancel () {
    }
  })
}
export const alertModal = {
  info:news => commonModal(news, 'info'),
  error:news => commonModal(news, 'error'),
  waring:news => commonModal(news, 'waring'),
  success:news => commonModal(news, 'success')
}
// alertModal.info('你好')
// 回到顶部
export const GoTop = () => (
  <div className='go-top'>
    <Icon type='to-top' />
  </div>
)
