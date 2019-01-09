import React from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../containers'
import PropTypes from 'prop-types'
export class Test extends React.Component {
  static propTypes={
    count:PropTypes.any,
    add:PropTypes.func
  }
  componentDidMount () {
    console.log(this.props)
  }
  render=() => {
    return (
      <div>
        做个测试{this.props.count}
        <button onClick={this.props.add}>累计加数</button>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)
