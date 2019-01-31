import React from 'react'
import {Table, Menu, Dropdown, Button, Icon, message, Modal,} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { formatDate } from 'fun'
import Api from 'api'
import RoleChange from './roleChange'
import NewRole from './newRole'

const confirm = Modal.confirm;

class HomeView extends React.Component {
  state = {
    renderList: []
  }
  componentDidMount () {
    window.queryRole = this.queryData
    window.closeNewRole = this.handleCancelNewRole
    this.queryData()
  }
  queryData =(platformName) => {
    let queryObj = null
    if (platformName !== null) {
      queryObj = {
        page: 1,
        name: platformName
      }
    } else {
      queryObj = {
        page: 1
      }
    }
    Api.queryRoleList(queryObj)
      .then(res => {
        console.log(res.data)
        const {data = []} = res
        this.setState({
          renderList: data.map((v, i) => {
            v.key = i
            return v
          })
        })
      })
  }
  showNewRole = () => {
    this.setState({
      visibleNewRole: true
    })
  }
  handleCancelNewRole = () => {
    this.setState({
      visibleNewRole: false
    })
  }
  showRoleChange = () => {
    this.setState({
      visibleRoleChange: true
    })
  }
  handleRoleChangeCancel = () => {
    this.setState({
      visibleRoleChange: false
    })
  }
  showDelete = (platId, roleId) => {
    confirm({
      title: '删除角色',
      content: '角色信息将被删除，请确认！',
      onOk() {
        Api.deleteRole(platId, roleId)
          .then(res => {
            window.queryRole()
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          })
      },
      onCancel() {},
    });
  }
  render =() => {
    const { renderList = [] } = this.state
    const columns = [{
      title: '平台ID',
      dataIndex: 'platformId',
      key: 'platformId'
    }, {
      title: '角色分类',
      dataIndex: 'roleType',
      key: 'roleType'
    }, {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '角色描述',
      dataIndex: 'dsc',
      key: 'dsc'
    }, {
      title: '角色操作',
      render: (text) => {
        console.log(text)
        return (<div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            this.showRoleChange()
            sessionStorage.setItem('updatePlatId', text.platformId)
            sessionStorage.setItem('updateRoleId', text.roleId)
          }}>修改角色</Button>
          <Button type='danger' onClick={() => {
            this.showDelete(text.platformId, text.roleId)
          }}>删除角色</Button>
        </div>)
      }
    }]
    return (
      <React.Fragment>
        <Button type='primary' style={{marginBottom: '10px', alignItems: 'right'}} onClick={() => {
          this.showNewRole()
        }}>增加新角色</Button>
        <Table dataSource={renderList} columns={columns} />
        <div>
          <Modal
            title='修改角色'
            visible={this.state.visibleRoleChange}
            onCancel={this.handleRoleChangeCancel}
            footer={[]}
          >
            <RoleChange />
          </Modal>
          <Modal
            title='增加角色'
            visible={this.state.visibleNewRole}
            onCancel={this.handleCancelNewRole}
            footer={[]}
          >
            <NewRole />
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
