var Storage = require('../util/storage')
var request = require('./request')
var config = require('../config/config')

var storage = {}

storage.get = function () {
    return Storage.getItem('messages')
}

storage.save = function (value) {
    return Storage.setItem('messages', value)
}


var req = {}

req.get = function (token) {
    let apiUrl = config.domain + config.apiPath + '/messages' + '?accesstoken=' + token

    return request.get(apiUrl)
        .then((data)=>data.data)
}

req.markAsRead = function (token) {
    let apiUrl = config.domain + config.apiPath + '/message/mark_all'

    return request.post(apiUrl, {
        accesstoken: token
    })
}


req.getMessageCount = function (token) {
    let url = config.domain + config.apiPath + '/message/count'
    return request.get(url, {
        accesstoken: token
    })
        .then(data=>data.data)
}


exports.storage = storage
exports.req = req
