import * as requestService from './request'

export function checkToken (token) {
  return requestService.post('/accesstoken', {
    accesstoken: token
  })
		.then(data => {
  if (data.success) {
    data.token = token
    return data
  }
  throw 'wrong token'
})
}

export function getUserInfo (userLoginName) {
  return requestService.get('/user/' + userLoginName)
		.then((data) => data.data)
}
