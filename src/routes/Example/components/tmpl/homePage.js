import React from 'react'
import { Button, Breadcrumb, Card, Tag } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
import api from 'api'
class HomeView extends React.Component {
  static propTypes={
    count:PropTypes.any,
    add:PropTypes.func,
    req:PropTypes.func,
  }
  componentDidMount () {
    // console.log(__DEV__)
    console.log(this.props)
    // api.lallal({
    //   name:'zhaosi'
    // })
    // .then(res => {
    //   this.setState({ data:res.data })
    // })
  }
  handle = () => {
    this.props.add()
  }
  skip=() => {
    history.push(`/example/${this.props.count}`)
  }
  req = () => {
    this.props.req()
  }
  render =() => {
    const { count } = this.props
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>用户</Breadcrumb.Item>
          <Breadcrumb.Item>我的客户</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
          <Tag color='magenta'>{count}</Tag>
          <div style={{ padding:10 }} />
          <Button onClick={this.handle}>点我</Button>
          <div style={{ padding:10 }} />
          <Button onClick={this.skip}>跳转到</Button>
          <div style={{ padding:10 }} />
          <Button onClick={this.req}>数据请求</Button>
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
