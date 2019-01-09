import React from 'react'
import { Button, Breadcrumb, Card, Alert } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
class Xueer extends React.Component {
  static propTypes={
    match:PropTypes.object,
  }

  componentDidMount () {
    console.log(this.props)
  }

  back=() => {
    history.goBack()
  }
  render =() => {
    const { params } = this.props.match
    const { id } = params
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>用户</Breadcrumb.Item>
          <Breadcrumb.Item>测试</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
          <Alert message={`传回来的值为----${id}`} type='success' />
          <div className='pd-10' />
          <Button onClick={this.back}>返回</Button>
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Xueer)
