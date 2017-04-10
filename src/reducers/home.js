import * as types from '../constants/ActionTypes'
import * as TABS from '../constants/Tabs'

const tabs = TABS.tabs

let initialState = {}

tabs.forEach((item) => {
  initialState[item] = {
    pullRefreshPending: false,
    reachedEndPending: false,
    page: 1,
    limit: 10,
    flag: 0
  }
})

export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}, tab} = meta
  const pending = sequence.type === 'start'

  switch (type) {
    case types.GET_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: {
          ...state[tab],
          reachedEndPending: pending,
          page: (!error && !pending) ? state[tab].page + 1 : state[tab].page
        }
      }
    case types.UPDATE_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: {
          ...state[tab],
          pullRefreshPending: pending,
          page: initialState[tab].page,
          flag: (!error && !pending) ? state[tab].flag + 1 : state[tab].flag
        }
      }
    default:
      return state
  }
}
