var Storage = require('./Storage')
var request = require('./Request')
var config = require('../configs/config')

var storage = {}

storage.get = function () {
    return Storage.getItem('messages')
}

storage.save = function (value) {
    return Storage.setItem('messages', value)
}

storage.remove = function () {
    return Storage.removeItem('messages')
}


var req = {}

req.get = function (token) {
    let apiUrl = config.domain + config.apiPath + '/messages' + '?accesstoken=' + token

    return request.get(apiUrl)
        .then((data)=>data.data)
        .then((messages)=> {
            if (messages) {
                storage.save(messages)
                return messages
            }
            else {
                throw 'getMessagesFailed'
            }
        })
}

req.markAsRead = function (token) {
    let apiUrl = config.domain + config.apiPath + '/message/mark_all'

    return request.post(apiUrl, {
        accesstoken: token
    })
        .then(data=> {
            console.log(data);
            if (data.success) {
                return data
            }
            else {
                throw 'markAsReadFailed'
            }
        })
}


req.getUnreadMessageCount = function (token) {
    let url = config.domain + config.apiPath + '/message/count'
    return request.get(url, {
        accesstoken: token
    })
        .then(data=>data.data)
}


exports.storage = storage
exports.req = req
