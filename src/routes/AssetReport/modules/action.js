// ------------------------------------
// Constants
// ------------------------------------
import Api from 'api'
export const UPDATE_DATA = Symbol('刷新数据')
export const ADD = Symbol('累加')
export const REQ = Symbol('数据请求事例')
// ------------------------------------
// Actions
// ------------------------------------
export const updateData = (data = 0) => {
  return {
    type: UPDATE_DATA,
    payload: data
  }
}
export const add = () => (dispatch, getState) => {
  setTimeout(() => {
    dispatch({
      type:ADD
    })
  })
}
// 举个例子 数据请求
export const req = () => (dispatch, getState) => {
  Api.login({ email:'', password:'' })
    .then(res => {
      dispatch({
        type:REQ,
        payload:res.data || []
      })
    })
}
export const actions = {
  updateData,
  add
}
