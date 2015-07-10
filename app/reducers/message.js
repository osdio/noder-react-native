var types = require('../constants/ActionTypes')

var initialState = {
    isLoading: false,
    messages: [],
    unreadMessageCount: 0
}


module.exports = function (state, action) {
    state = state || initialState

    switch (action.type) {
        case types.GET_UNREAD_MESSAGE_COUNT_SUCCESS:
            return {
                ...state,
                unreadMessageCount: action.count
            }

        case types.GET_MESSAGES:
            return {
                isLoading: true,
                unreadMessageCount: action.messages.hasnot_read_messages.length,
                messages: messages
            }

        case types.FETCH_MESSAGES_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case types.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        case types.FETCH_MESSAGES_FAILED:
            return {
                messages: action.messages,
                isLoading: false,
                unreadMessageCount: action.messages.hasnot_read_messages.length
            }

        default :
            return state
    }
}
