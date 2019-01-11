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
  componentDidMount() {
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
        const {data = []} = res
        this.setState({
          rederList:data.map((v, i) => {
            v.key = i
            return v
          })
        })
      })
  }
  render=() => {
    const {renderList = []} = this.state
    const conlumns = [{
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
      key: 'msg'
    }]
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
