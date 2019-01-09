// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_DATA = Symbol('update-data')
export const ADD = Symbol('add')

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
export const actions = {
  updateData,
  add
}
