var request = require('./request')
var Storage = require('../util/storage')

var config = require('../configs/config')


var storage = {}

storage.get = function (tab) {
    return Storage.getItem('tab_' + tab)
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

    console.log(apiUrl);

    return request.post(apiUrl, {
        accesstoken: token,
        topic_id: id
    })
        .then(data => {
            console.log(data);
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


exports.storage = storage
exports.req = req
