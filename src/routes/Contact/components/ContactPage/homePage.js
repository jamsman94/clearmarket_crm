import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
import Api from 'api'
import { Card, Breadcrumb} from 'antd';
import ContactTable from './ContactTable'

class HomeView extends React.Component {
  static propTypes = {}
  componentDidMount() {{
    console.log(1)
  }}
  render =() => {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>平台</Breadcrumb.Item>
          <Breadcrumb.Item>联系我们管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
          <ContactTable />
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
