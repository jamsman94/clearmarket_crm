import React from 'react'
import {Table, Menu, Dropdown, Button, Icon, message, Modal,} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import Api from 'api'
import UpdateOperator from './updateOperator'
import NewOperator from './newOperator'

const confirm = Modal.confirm;

class HomeView extends React.Component {
  state = {
    renderList: [],
    platList: [],
    roleList: [],
    accountInfo: null
  }
  componentDidMount () {
    window.queryOperator = this.queryData
    window.closeOperatorInfoChange = this.handleOperatorInfoChangeClose
    window.closeOperatorPassChange = this.handleOperatorPassChangeCancel
    window.closeNewOperator = this.handleNewOperatorCancel
    this.queryData()
  }
  updatePlatList = (queryObj) => {
    Api.platformList(queryObj)
      .then(res => {
        // console.log(res.data)
        this.setState({ platList: res.data })
        // console.log(this.state.roleList)
      })
  }

  queryData =(platformName) => {
    let queryObj = {
      page: 1,
      platformId: sessionStorage.getItem('platformId')
    }
    Api.queryOperator(queryObj)
      .then(res => {
        const {data = []} = res
        this.setState({
          renderList: data.map((v, i) => {
            v.key = i
            return v
          })
        })
      })
  }
  showDelete = (platId, oprId) => {
    confirm({
      title: '删除平台',
      content: '将要删除这个角色，请确认',
      onOk() {
        Api.deleteOperator(platId, oprId)
          .then(res => {
            window.queryOperator()
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          })
      },
      onCancel() {},
    });
  }
  showOperatorInfoChange = (platId) => {
    this.setState({
      visibleOperatorInfoChange: true
    })
    Api.updateRoleList(platId)
      .then(res => {
        this.setState({
          roleList: res.data
        })
      })
  }
  handleOperatorInfoChangeClose = () => {
    this.setState({
      visibleOperatorInfoChange: false
    })
  }
  showOperatorPassChange = () => {
    this.setState({
      visibleOperatorPassChange: true
    })
  }
  handleOperatorPassChangeCancel = () => {
    this.setState({
      visibleOperatorPassChange: false
    })
  }
  showNewOperator = () => {
    this.setState({
      visibleNewOperator:true
    })
  }
  handleNewOperatorCancel = () => {
    this.setState({
      visibleNewOperator: false
    })
  }
  render =() => {
    const { renderList = [] } = this.state
    const columns = [{
      title: '操作员账号',
      dataIndex: 'oprId',
      key: 'oprId'
    }, {
      title: '平台ID',
      dataIndex: 'platformId',
      key: 'platformId'
    }, {
      title: '角色类别',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '操作员描述',
      dataIndex: 'oprDsc',
      key: 'oprDsc'
    }, {
      title: '操作',
      render: (text) => {
        return (<div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            this.setState({ accountInfo: text })
            this.showOperatorInfoChange(text.platformId)
            console.log(this.state.roleList)
          }}>操作员修改</Button>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            this.setState({ accountInfo: text })
            this.showOperatorPassChange()
          }}>密码修改</Button>
          <Button type='danger' onClick={() => {
            this.showDelete(text.platformId, text.oprId)
          }}>删除管理员</Button>
        </div>)
      }
    }]
    return (
      <React.Fragment>
        <Button type='primary' style={{marginBottom: '10px', alignItems: 'right'}} onClick={(event) => {
          this.updatePlatList(sessionStorage.getItem('platformId'))
          this.showNewOperator()
        }}>增加管理员</Button>
        <Table dataSource={renderList} columns={columns} />
        <div>
          <Modal
            title='修改操作员信息'
            visible={this.state.visibleOperatorInfoChange}
            onCancel={this.handleOperatorInfoChangeClose}
            footer={[]}
          >
            <UpdateOperator passOrUpdate={true} roleList={this.state.roleList} accountInfo={this.state.accountInfo} />
          </Modal>
          <Modal
            title='修改操作员密码'
            visible={this.state.visibleOperatorPassChange}
            onCancel={this.handleOperatorPassChangeCancel}
            footer={[]}
          >
            <UpdateOperator passOrUpdate={false} accountInfo={this.state.accountInfo} />
          </Modal>
          <Modal
            title='增加操作员'
            visible={this.state.visibleNewOperator}
            onCancel={this.handleNewOperatorCancel}
            footer={[]}
          >
            <NewOperator platList={this.state.platList} />
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
