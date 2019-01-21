import React from 'react'
import { Menu, Dropdown, Button, Icon, message, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import Api from 'api'
const Option = Select.Option
class HomeView extends React.Component {
  state = {
    platformList: []
  }

  componentDidMount () {
    this.getPlatformList()

  }

  getPlatformList = () => {
    Api.platformList()
      .then(res => {
        const {data = []} = res
        this.setState({
          platformList: data
        })
        window.reportReq && window.reportReq({platformId: sessionStorage.getItem('platformId')})
        // if (data[0]) {
        //   window.reportReq && window.reportReq({
        //     platformId: data[0].platformId
        //   })
        // }
      })
  }

  handleChange = (e) => {
    // message.info('Click on menu item.')
    console.log(e)
    const platformId = e
    window.reportReq && window.reportReq({platformId})
  }
  render = () => {
    const {platformList = []} = this.state
    return (<div>
      <Select style={{width: 120}} onChange={this.handleChange} placeholder='请选择'>
        <Option value='0'>请选择</Option>
        {
          platformList.map((v, i) => (
            <Option key={v.platformId} selected={i === 0} value={v.platformId}>{v.platformId}-{v.rename}</Option>
          ))
        }
      </Select>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
