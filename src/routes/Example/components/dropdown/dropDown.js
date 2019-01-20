import React from 'react'
import { Menu, Dropdown, Button, Icon, message, } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps} from '../../containers';
import Api from 'api'

class HomeView extends React.Component {
  state = {}
  componentDidMount () {
    console.log(this.props)
  }

  render=() => {
    function handleButtonClick(e) {
      message.info('Click on left button.');
      console.log('click left button', e);
    }

    function handleMenuClick(e) {
      message.info('Click on menu item.');
      console.log('click', e);
    }

    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1"><Icon type="user" />1000 - CM</Menu.Item>
        <Menu.Item key="2"><Icon type="user" />1001 - TH</Menu.Item>
        <Menu.Item key="3"><Icon type="user" />3rd item</Menu.Item>
      </Menu>
    )
    return (<div>
      <Dropdown overlay={menu} style={{marginBottom: 10}}>
        <Button style={{ marginLeft: 8 }}>
          平台选择 <Icon type="down" />
        </Button>
      </Dropdown>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
