import { connect } from 'react-redux'
import { updateData, add, req } from '../modules/action'
import PageContainer from '../components'
// 输出逻辑
export const mapDispatchToProps = {
  updateData:(data) => updateData(data),
  add:() => add(),
  req :data => req(data)
}
// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.tradeHistory.count,
  list: state.tradeHistory.list,
})
export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
