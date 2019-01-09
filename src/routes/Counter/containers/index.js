import { connect } from 'react-redux'
import { updateData, add } from '../modules/action'
import PageContainer from '../components'
export const aaa = '9999'
// 输出逻辑
export const mapDispatchToProps = {
  updateData:(data) => updateData(data),
  add:() => add()
}
// 输入逻辑
export const mapStateToProps = (state) => ({
  count: state.counter.count
})
export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
