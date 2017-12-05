import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import * as storageService from '../services/storage'

const syncReducer = ['user', 'message', 'topic']

export const toast = createAction(types.TOAST, (text, timeout) => {
  return {
    text,
    timeout,
    id: new Date().getTime()
  }
})

export const getReducerFromAsyncStorage = createAction(types.GET_REDUCER_FROM_ASYNC_STORAGE, async() => {
  return storageService.multiGet(syncReducer)
		.then(arr => {
  let ob = {}
  arr.forEach(item => {
    ob[item[0]] = item[1]
  })
  if (ob.user && ob.user.secret) {
    global.token = ob.user.secret.token
  }
  return ob
})
		.catch(err => {
  console.warn(err)
})
}, (resolved, rejected) => {
  return {
    resolved,
    rejected
  }
})
