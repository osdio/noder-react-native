import * as requestService from './request'
import {getToken, setToken} from './token'

function filterData (data) {
  return data.data
}

export function getTopicsByTab (tab = 'all', params = {}) {
  return requestService.get('/topics', {
    tab,
    page: 1,
    limit: 10,
    ...params
  })
		.then(filterData)
}

export function getTopicById (id) {
  return requestService.get('/topic/' + id)
		.then(filterData)
		.then(topic => {
  if (topic && topic.id) {
    return topic
  }
  throw 'getTopicById Error'
})
}

export function reply ({topicId, content, replyId}) {
  let body = {
    accesstoken: getToken(),
    content: content
  }
  if (replyId) {
    body.reply_id = replyId
  }
  let url = `/topic/${topicId}/replies`

  return requestService.post(url, body)
		.then(data => {
  if (data.success) {
    return data.reply_id
  }			else {
    throw 'do reply failed'
  }
})
}

export function upReply ({replyId}) {
  let body = {
    accesstoken: getToken()
  }

  let url = `/reply/${replyId}/ups`

  return requestService.post(url, body)
		.then(data => {
  if (data.success) {
    return data.action == 'up'
  }			else {
    throw 'up reply failed'
  }
})
}

export function publish ({title, tab, content}) {
  const body = {
    title: title,
    tab: tab,
    content: content,
    accesstoken: getToken()
  }
  return requestService.post('/topics', body)
		.then(data => {
  if (data.success) {
    return data.topic_id
  }
  throw 'publish failed'
})
}
