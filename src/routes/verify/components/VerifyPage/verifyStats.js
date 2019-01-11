import React from 'react'
import { Button, Breadcrumb, Card, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../containers'
import { history, formatDate } from 'fun'
import Api from 'api'
import '../../style.scss'

class HomeView extends  React.Component {
  state = {
    tabPosition: 'left',
    renderList:[]
  }
  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition })
  }
  componentDidMount () {
    // console.log(this.props)
    this.getStats()
  }
  getStats=() => {
    Api.getVerifyData()
      .then(res => {
        console.log(res)
        res.data
        this.setState({renderList:res.data||[]})
      })
  }
  render=() => {
    const  {renderList}=this.state
    return (
      <Card title="认证数据分析">
        <p
          style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.85)',
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
        </p>
        <div className={'stat-card'}>
          {
            renderList.map((v,i)=>{
              let num = null

              switch (i) {
                case 0:
                  num='每日认证人数'
                      break
                case 1:
                  num='每月认证人数'
                  break
                case 2:
                  num='每年认证人数'
                  break
                case 3:
                  num='总认证人数'
                  break
            }
              return (
                <Card
                  key={i}
                  title={num}
                  style={{ width: '25%', margin: 10 }}
                >
                  <p>{v}</p>
                </Card>
              )
            })
          }
        </div>
      </Card>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
