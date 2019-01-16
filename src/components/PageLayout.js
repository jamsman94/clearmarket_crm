import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
// import * as Cookies from 'js-cookie'
import { history } from '@/components/handleFun'
import './component.scss'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
class Auth extends React.Component {
  state = {
    collapsed: false,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  componentDidMount () {
    // !Cookies.get('token') && (history.push('/login'))
  }
  logout=() => {

  }
  skip=(val) => {
    history.push(`/${val}`)
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  render () {
    const platformId = sessionStorage.getItem('platformId')
    console.log(platformId)
    if (platformId === null){
      history.push('/login')
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo' />
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <SubMenu
              key='sub1'
              title={<span><Icon type='user' /><span>系统管理</span></span>}
            >
              <Menu.Item key='1' onClick={() => history.push('/platform')}>平台管理</Menu.Item>
              <Menu.Item key='2' onClick={() => history.push('/operator')}>操作员管理</Menu.Item>
              <Menu.Item key='3' onClick={() => history.push('/role')}>角色管理</Menu.Item>
              <Menu.Item key='4' onClick={() => history.push('/contact')}>客户联系</Menu.Item>
              <Menu.Item key='5' onClick={() => history.push('/verify')}>认证统计</Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={<span><Icon type='team' /><span>平台管理</span></span>}
            >
              <Menu.Item key='21' onClick={() => history.push('/asset-report')}>平台资产认证</Menu.Item>
              <Menu.Item key='22' onClick={() => history.push('/trade-history')}>交易历史</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 10, minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
Auth.propTypes = {
  children: PropTypes.node,
}
export default Auth
