var request = require('./Request')
var Storage = require('./Storage')

var config = require('../configs/config')
var tabs = ['good', 'ask', 'all', 'share', 'job']


var storage = {}

storage.get = function (tab) {
    return Storage.getItem('tab_' + tab)
        .then(topics=> {
            if (topics) {
                return topics
            }
            throw 'topicsInStorageIsEmpty'
        })
}

storage.getAll = function () {
    return Storage.multiGet(tabs.map(tab=> {
        return 'tab_' + tab
    }))
}


storage.remove = function () {
    return Storage.multiRemove(tabs.map(tab=> {
        return 'tab_' + tab
    }))
}


var req = {}


req.getTopicsByTab = function (params) {
    var url = config.domain + '/api/v1/topics'

    return request.get(url, params)
        .then(data=>data.data)
        .then(topics => {
            if (params.page == 1 && topics) {
                Storage.setItem('tab_' + params.tab, topics)
            }
            return topics
        })
}


req.getTopicById = function (id) {
    let url = config.domain + '/api/v1/topic/' + id
    return request.get(url)
        .then(data=>data.data)
        .then(topic=> {
            if (topic && topic.id) {
                return topic
            }
            throw 'GetTopicError'
        })
}


req.markTopicAsLike = function (id, token, isLiked) {
    var apiUrl = config.domain + config.apiPath

    if (!isLiked) {
        apiUrl += '/topic/collect'
    }
    else {
        apiUrl += '/topic/de_collect'
    }


    return request.post(apiUrl, {
        accesstoken: token,
        topic_id: id
    })
        .then(data => {
            if (!data.success) {
                throw 'error'
            }
            return data
        })
}


req.reply = function (topicId, content, token, replyId) {
    let apiUrl = config.domain + config.apiPath
    var body = {
        accesstoken: token,
        content: content
    }
    if (replyId) {
        body.reply_id = replyId
    }
    let url = `${apiUrl}/topic/${topicId}/replies`

    return request.post(url, body)
        .then(data=> {
            if (data.success) {
                return data.reply_id
            }
            else {
                throw 'do reply failed'
            }
        })
}


req.upComment = function (replyId, token) {
    let apiUrl = config.domain + config.apiPath
    var body = {
        accesstoken: token
    }

    let url = `${apiUrl}/reply/${replyId}/ups`

    return request.post(url, body)
        .then(data=> {
            if (data.success) {
                return data.action == 'up'
            }
            else {
                throw 'do reply failed'
            }
        })
}


req.publish = function (title, tab, content, token) {
    let url = `${config.domain + config.apiPath}/topics`
    const body = {
        title: title,
        tab: tab,
        content: content,
        accesstoken: token
    }
    return request.post(url, body)
        .then(data=> {
            if (data.success) {
                return data.topic_id
            }
            throw 'publish failed'
        })
}


exports.storage = storage
exports.req = req
