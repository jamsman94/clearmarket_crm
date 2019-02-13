import React from 'react'
import { Button, Breadcrumb, Card, Tag, Table, Modal, Input } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'
import UpdateForm from './updateForm'

class HomeView extends React.Component {
  state={
    renderList:[]
  }
  componentDidMount () {
    // console.log(this.props)
    window.assetsReq = this.getData
    window.closeModal = this.handleOk
    this.getData()
  }
  getData=()=>{
    const queryObj = {
      page: 1,
      platformId: sessionStorage.getItem('platformId')
    }
    Api.queryAssets(queryObj)
      .then(res => {
        // console.log(res.data)
        // dataSource = res.data
        const {data = []}=res
        this.setState({
          renderList:data.map((v,i)=>{
            v.key = i
            return v
          })
        })
      })

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render =() => {
    const {renderList=[]}=this.state
    const columns = [{
      title: '平台名称',
      dataIndex: 'platformName',
      key: 'platformName'
    }, {
      title: '资产数量',
      dataIndex: 'assets',
      key: 'assets',
    }, {
      title: '最后更新时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (data) => formatDate(data)

    }, {
      title: '操作',
      render: (text,record)=>{
        return <a onClick={()=>{
          this.showModal()
          sessionStorage.setItem('updatePlatId', record.platformId)
        }}>修改</a>
      }
    }]
    return (
      <React.Fragment>
        <Table dataSource={renderList} columns={columns} />
        <div>
          {/*<Button type="primary" onClick={this.showModal}>*/}
            {/*Open Modal*/}
          {/*</Button>*/}
          <Modal
            title="修改账户资产"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <UpdateForm></UpdateForm>
          </Modal>
        </div>
      </React.Fragment>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
