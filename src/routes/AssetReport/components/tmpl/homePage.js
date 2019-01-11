import React from 'react'
import { Button, Breadcrumb, Card, Tag } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
import Api from 'api'
import Asset from './assets'

class HomeView extends React.Component {
  static propTypes={
  }
  componentDidMount () {
    // console.log(this.props)
  }
  render =() => {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>平台</Breadcrumb.Item>
          <Breadcrumb.Item>平台资产</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
          <Asset />
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
