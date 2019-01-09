import { connect } from 'react-redux'
import { updateData, add, req, changeType } from '../modules/action'
import PageContainer from '../components'
// 输出逻辑
export const mapDispatchToProps = {
  updateData:(data) => updateData(data),
  add:() => add(),
  req :data => req(data),
  changeType:data => changeType(data)
}
// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.login.count,
  list: state.login.list,
  type:state.login.type,
})
export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
