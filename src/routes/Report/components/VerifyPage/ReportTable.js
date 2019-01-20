import React from 'react'
import { Table, Menu, Dropdown, Button, Icon, message, } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { formatDate } from 'fun'
import Api from 'api'

class HomeView extends React.Component {
  state = {
    renderList: []
  }
  componentDidMount () {
    console.log(this.props)
    this.updateData()
  }
  updateData =(platformId) => {
    let queryObj = null
    if (platformId !== null) {
      queryObj = {
        page: 1,
        platformId: sessionStorage.getItem('platformId')
      }
    } else {
      queryObj = {
        page: 1,
        platformId: platformId
      }
    }
    Api.queryReport(queryObj)
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
  render =() => {
    const { renderList = [] } = this.state
    const columns = [{
      title: '联系平台',
      dataIndex: 'platformId',
      key: 'platformId',
      render: (data) => {
        if (data === 1001) {
          return '天厚投资'
        } else {
          return '未知平台'
        }
      }
    }, {
      title: '举报者ID',
      dataIndex: 'accountId',
      key: 'accountId',
      render: (data, record) => (<div className='IDRow' title={record.accountId}> {record.accountId} </div>)
    }, {
      title: '账户资产',
      dataIndex: 'assets',
      key: 'assets',
      render: (data) => {
        return (Math.trunc(data * 100) / 100)
      }
    }, {
      title: '账户风险',
      dataIndex: 'counterPartyRish',
      key: 'counterPartyRish',
      render: (data) => {
        return (Math.trunc(data * 100) / 100)
      }
    }, {
      title: '交易对手',
      dataIndex: 'counterParty',
      key: 'counterParty'
    }, {
      title: '举报内容',
      dataIndex: 'descr',
      key: 'descr'
    }, {
      title: '举报时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (data) => formatDate(data)
    }]
    return (
      <Table dataSource={renderList} columns={columns} />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
