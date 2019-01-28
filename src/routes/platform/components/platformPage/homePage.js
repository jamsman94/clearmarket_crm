import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history } from 'fun'
import Api from 'api'
import { Card, Breadcrumb} from 'antd'
import AddPlatform from './addPlatform'
import DropDown from 'pages/Example/components/dropdown/dropDown'

class HomeView extends React.Component {
  static propTypes = {}
  componentDidMount () {}
  render =() => {
    return (
      <React.Fragment>
        <Breadcrumb style={{ margin: '10px 0' }}>
          <Breadcrumb.Item>系统</Breadcrumb.Item>
          <Breadcrumb.Item>平台管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card
          hoverable
          style={{ minHeight:400 }}
        >
          <AddPlatform />
        </Card>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
