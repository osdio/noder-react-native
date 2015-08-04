var types = require('../constants/ActionTypes')
var UserService = require('../services/UserService')
var TopicService = require('../services/TopicService')
var MessageService = require('../services/MessageService')
var Storage = require('../services/Storage')


function getUser(user) {
    return {
        type: types.GET_USER,
        user: user
    }
}


exports.getLoginUserFromStorage = function () {
    return dispatch=> {
        var userTemp = {}
        UserService.storage.getUser()
            .then((user)=> {
                // console.log('haveLoadedUser');
                if (user) {
                    dispatch(getUser(user))
                    userTemp = user
                    return UserService.req.getLoginUserInfo(user)
                }
                else {
                    throw 'GET_LOGIN_USER_FROM_STORAGE_FAILED'
                }

            })
            .then(userFetched=> {
                // console.log('fetchUser');
                if (userFetched) {
                    var userUpdated = Object.assign(userTemp, userFetched)
                    UserService.storage.saveUser(userUpdated)
                    dispatch(getUser(userTemp))
                }
            })
            .catch((err)=> {
                console.warn(err)
            })
            .done()
    }
}


exports.fetchUser = function fetchUser(user) {
    return dispatch => {
        UserService.req.getLoginUserInfo(user)
            .then(userInfo=> {
                if (userInfo) {
                    Object.assign(user, userInfo)
                    UserService.storage.saveUser(user)
                    dispatch(getUser(user))
                }
            })
            .catch(err=> {
                console.warn(err)
            })
            .done()
    }
}


exports.checkToken = function (token) {
    return dispatch=> {
        var userTemp = {}
        dispatch({
            type: types.CHECK_TOKEN_REQUREST
        })
        UserService.req.checkToken(token)
            .then(user=> {
                userTemp = user
                return UserService.req.getLoginUserInfo(user)
            })
            .then((userInfo)=> {
                if (userInfo) {
                    Object.assign(userTemp, userInfo)
                    UserService.storage.saveUser(userTemp)
                    dispatch(getUser(userTemp))
                    dispatch({
                        type: types.CHECK_TOKEN_SUCCESS,
                        isModalOpen: false
                    })
                }
                else {
                    throw 'CHECK_TOKEN_FAILED'
                }
            })
            .catch(function (err) {
                console.warn(err)
                dispatch({
                    type: types.CHECK_TOKEN_FAILED,
                    err: err
                })
                window.alert('token验证失败')
            })
            .done()
    }
}


exports.likeTopic = function (topic) {
    return {
        type: types.LIKE_TOPIC,
        topic: {
            id: topic.id,
            author: topic.author,
            title: topic.title,
            last_reply_at: topic.last_reply_at
        }
    }
}


exports.unLikeTopic = function (id) {
    return {
        type: types.UN_LIKE_TOPIC,
        id: id
    }
}


exports.logout = function () {
    UserService.storage.clearUser()
    return {
        type: types.LOGOUT
    }
}


exports.clear = function () {
    TopicService.storage.remove()
    MessageService.storage.remove()
    return {
        type: types.CLEAR
    }
}
