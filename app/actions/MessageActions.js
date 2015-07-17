var types = require('../constants/ActionTypes')
var MessageService = require('../services/MessageService')


var window = require('../util/window')


function getMessages(messages) {
    return {
        type: types.GET_MESSAGES,
        hasRead: messages.has_read_messages,
        hasNotRead: messages.hasnot_read_messages,
        isLoading: true
    }
}

function fetchMessagesRequest() {
    return {
        type: types.FETCH_MESSAGES_REQUEST,
        isLoading: true
    }
}

function fetchMessagesSuccess(messages) {
    return {
        type: types.FETCH_MESSAGES_SUCCESS,
        isLoading: false,
        hasRead: messages.has_read_messages,
        hasNotRead: messages.hasnot_read_messages,
    }
}

function fetchMessagesFailed(err) {
    return {
        type: types.FETCH_MESSAGES_FAILED,
        isLoading: false,
        err: err
    }
}

exports.getUnreadMessageCount = function (token) {
    return dispatch=> {
        MessageService.req.getUnreadMessageCount(token)
            .then(count=> {
                dispatch({
                    type: types.GET_UNREAD_MESSAGE_COUNT_SUCCESS,
                    count: count
                })
            })
            .catch(err=> {
                console.warn(err)
            })
            .done()
    }
}


exports.getMessages = function (token) {
    return dispatch=> {

        dispatch(fetchMessagesRequest())

        MessageService.storage.get()
            .then(messages=> {
                if (messages) {
                    dispatch(getMessages(messages))
                }
                return MessageService.req.get(token)
            })
            .then(messages=> {
                if (messages) {
                    dispatch(fetchMessagesSuccess(messages))
                }
                else {
                    throw 'FETCH_MESSAGES_FAILED'
                }
            })
            .catch(err=> {
                dispatch(fetchMessagesFailed(err))
            })
            .done()
    }
}


exports.fetchMessages = function (token) {
    return dispatch=> {
        dispatch(fetchMessagesRequest())

        MessageService.req.get(token)
            .then(messages=> {
                if (messages) {
                    dispatch(fetchMessagesSuccess(messages))
                }
                else {
                    throw 'FETCH_MESSAGES_FAILED'
                }
            })
            .catch(err=> {
                dispatch(fetchMessagesFailed(err))
            })
            .done()
    }
}


exports.markAsRead = function (token) {
    return dispatch=> {
        dispatch({
            type: types.MARK_AS_READ_REQUEST
        })
        MessageService.req.markAsRead(token)
            .then(()=> {
                dispatch({
                    type: types.MARK_AS_READ_SUCCESS
                })
                window.alert('已全部标记为已读!')
            })
            .catch(()=> {
                dispatch({
                    type: types.MARK_AS_READ_FAILED
                })
                window.alert('标记失败!')
            })
            .done()
    }
}
