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
    sessionStorage.clear()
    history.push('/login')
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
              key='systemControl'
              title={<span><Icon type='user' /><span>系统管理</span></span>}
              id='000001'
            >
              <SubMenu
                key='platform'
                id='100020'
                title={<span>平台管理</span>}
              >
                <Menu.Item key='platform' id='100022' onClick={() => history.push('/platform')}>平台管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key='role'
                id='100010'
                title={<span>角色添加</span>}
              >
                <Menu.Item key='role' id='100012' onClick={() => history.push('/role')}>角色添加</Menu.Item>
              </SubMenu>
              <SubMenu
                key='operator'
                id='100000'
                title={<span>操作员添加</span>}
              >
                <Menu.Item key='operator' id='100002' onClick={() => history.push('/operator')}>操作员管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key='contactus'
                id='100030'
                title={<span>联系我们管理</span>}
              >
                <Menu.Item key='contactus' id='100032' onClick={() => history.push('/contact')}>联系我们管理</Menu.Item>
              </SubMenu>
              <SubMenu
                key='report'
                id='100040'
                title={<span>报表管理</span>}
              >
                <Menu.Item key='verify' id='100041' onClick={() => history.push('/verify')}>认证数量统计</Menu.Item>
              </SubMenu>
              <SubMenu
                key='usrreport'
                id='100020'
                title={<span>举报管理</span>}
              >
                <Menu.Item key='usrreport' id='100022' onClick={() => history.push('/report')}>举报管理</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key='platformControl'
              title={<span><Icon type='team' /><span>平台管理</span></span>}
            >
              <SubMenu
                key='assets'
                id='200000'
                title={<span>资产认证</span>}
              >
                <Menu.Item key='assets' id='200002' onClick={() => history.push('/asset-report')}>资产更新</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            123
          </Header>
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
