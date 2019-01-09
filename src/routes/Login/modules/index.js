import { UPDATE_DATA, ADD, REQ, CHANGETYPE } from './action'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHANGETYPE]    : (state, action) => {
    return {
      ...state,
      type:action.payload
    }
  },
  [UPDATE_DATA]    : (state, action) => {
    return {
      ...state,
      count:action.payload
    }
  },
  [ADD]:(state, action) => {
    return {
      ...state,
      count:state.count + 1
    }
  },
  [REQ]:(state, action) => {
    return {
      ...state,
      list:action.payload
    }
  },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count:0,
  list:[],
  type:'login'
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}