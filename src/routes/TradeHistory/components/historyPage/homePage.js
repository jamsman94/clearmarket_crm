import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
import Api from 'api'
import { Card, Breadcrumb} from 'antd';

class HomeView extends React.Component {
  static propTypes = {}
  componentDidMount() {{
    console.log(this.props)
  }}
  render =() => {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>平台</Breadcrumb.Item>
          <Breadcrumb.Item>平台交易历史</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
