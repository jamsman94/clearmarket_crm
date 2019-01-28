import React from 'react'
import {Table, Menu, Dropdown, Button, Icon, message, Modal,} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { formatDate } from 'fun'
import Api from 'api'
import UpdatePlatform from './updatePlatform'
import NewPlatform from './newPlatform'

const confirm = Modal.confirm;

class HomeView extends React.Component {
  state = {
    renderList: []
  }
  componentDidMount () {
    window.queryPlat = this.queryData
    window.closeUpdate = this.handleCancel
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
    Api.queryPlatInfo(queryObj)
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
  showModal = () => {
    this.setState({
      visibleUpdate: true,
    });
  }

  showDelete = () => {
    confirm({
      title: '删除平台',
      content: '平台的所有数据将会被删除，请确认',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  showNew = () => {
    this.setState({
      visibleNew: true
    })
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleUpdate: false,
    });
  }

  handleCancelNew = (e) => {
    console.log(e);
    this.setState({
      visibleNew: false,
    });
  }
  render =() => {
    const { renderList = [] } = this.state
    const columns = [{
      title: '平台ID',
      dataIndex: 'platformId',
      key: 'platformId'
    }, {
      title: '平台中文名称',
      dataIndex: 'platformCnName',
      key: 'platformCnName'
    }, {
      title: '平台英文名称',
      dataIndex: 'platformEnName',
      key: 'platformEnName'
    }, {
      title: '平台操作',
      render: (text) => {
        return (<div>
          <Button type='primary' style={{ marginRight: '10px' }} onClick={() => {
            this.showModal()
            sessionStorage.setItem('updatePlatId', text.platformId)
            sessionStorage.setItem('updateRename', text.reName)
          }}>修改信息</Button>
          <Button type='danger' onClick={() => {
            this.showDelete()
          }}>删除平台</Button>
        </div>)
      }
    }]
    return (
      <React.Fragment>
        <Button type='primary' style={{marginBottom: '10px', alignItems: 'right'}} onClick={() => {
          this.showNew()
        }}>增加新平台</Button>
        <Table dataSource={renderList} columns={columns} />
        <div>
          <Modal
            title='修改平台信息'
            visible={this.state.visibleUpdate}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <UpdatePlatform />
          </Modal>
          <Modal
            title='增加新平台'
            visible={this.state.visibleNew}
            onOk={this.handleNew}
            onCancel={this.handleCancelNew}
            footer={[]}
          >
            <NewPlatform />
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
