import * as types from '../constants/ActionTypes'

const initialState = {
  secret: null,
  publicInfo: null,
  updatePending: false,
  users: {}
}

export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}} = meta
  if (sequence.type === 'start' || error) {
    return state
  }

  switch (type) {
    case types.CHECK_TOKEN:
      return {
        ...state,
        ...payload
      }
    case types.GET_REDUCER_FROM_ASYNC_STORAGE:
      return {
        ...state,
        ...(payload.user || initialState)
      }
    case types.UPDATE_CLIENT_USER_INFO:
      return {
        ...state,
        publicInfo: payload
      }
    case types.GET_USER_INFO:
      let {userName = 'soliury'} = meta
      return {
        ...state,
        users: {
          ...state.users,
          [userName]: payload
        }
      }
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}
