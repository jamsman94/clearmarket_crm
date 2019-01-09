import React from 'react'
import { Button, Breadcrumb, Pagination, Rate, Alert, Spin } from 'antd'

import PropTypes from 'prop-types'
import TempTest from './test'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../containers'
console.log(mapStateToProps, mapDispatchToProps)
class Counter extends React.Component {
  static propTypes={
    count:PropTypes.any,
    add:PropTypes.func,
  }
  componentDidMount () {
    // console.log(__DEV__)
    console.log(this.props)
  }
  state = {
    loading: false
  }
  handle = () => {
    console.log(this.props, 1)
  }
  loading = () => {
    window.shijian.add()
    // this.setState({
    //   loading: true
    // })
  }
  render =() => {
    const { count, add } = this.props
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <div className='pd-5'>计数{count}</div>
          <Button onClick={add}>累计加数</Button>
          <Pagination defaultCurrent={1} total={50} onChange={() => { }} />
          <Rate />
          <Alert message='Success Text' type='success' />
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href=''>Application Center</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href=''>Application List</a></Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
        </Spin>
        <Button onClick={this.loading}>加载</Button>
        <Button onClick={() => {
          this.setState({ loading: false })
        }}>关掉</Button>
        <TempTest />
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
