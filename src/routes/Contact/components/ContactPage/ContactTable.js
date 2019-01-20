import React from 'react'
import { Button, Breadcrumb, Card, Tag, Table, Modal, Input } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'

class HomeView extends React.Component {
  state = {
    renderList: []
  }
  componentDidMount () {
    console.log(this.props)
    window.updateData = this.updateData
    this.updateData()
  }
  updateData=() => {
    const queryObj = {
      page: 1
    }
    Api.queryContacts(queryObj)
      .then(res => {
        console.log(res.data)
        const { data = []} = res
        this.setState({
          renderList:data.map((v, i) => {
            v.key = i
            return v
          })
        })
        // console.log('done')
      })
  }
  tagAsRead=(data) => {
    const queryObj = {
      id: data
    }
    Api.updateContacts(queryObj)
      .then(res => {
        console.log(res)
      })
  }
  render=() => {
    const { renderList = [] } = this.state
    // console.log(renderList)
    const columns = [{
      title: '公司名称',
      dataIndex: 'company',
      key: 'company'
    }, {
      title: '联系方式',
      dataIndex: 'email',
      key: 'index',
      render: (data) => {
        if (data === null) {
          return '暂无'
        } else {
          return data
        }
      }
    }, {
      title: '公司网址',
      dataIndex: 'link',
      key: 'link',
      render: (data) => {
        if (data === null) {
          return '暂无'
        } else {
          return data
        }
      }
    }, {
      title: '联系信息',
      dataIndex: 'msg',
      key: 'msg',
      render: (data) => {
        if (data === null) {
          return '暂无'
        } else {
          return data
        }
      }
    }, {
      title: '联系时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (data) => formatDate(data)
    }, {
      title: '处理时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (data) => formatDate(data)
    }, {
      title: '已读/未读',
      dataIndex: 'flag',
      key: 'flag',
      render: (data) => {
        if (data === true) {
          return '已处理'
        } else {
          return '未处理'
        }
      }
    }, {
      title: '处理',
      render: (text, record) => {
        return <a onClick={() => {
          // console.log(record.id)
          this.tagAsRead(record.id)
          this.updateData()
        }} >处理</a>
      }
    }]
    return (
      <Table dataSource={renderList} columns={columns} />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
