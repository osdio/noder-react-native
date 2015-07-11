var types = require('../constants/ActionTypes')

var initialState = {
    isLoading: false,
    hasNotRead: [],
    hasRead: [],
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
                unreadMessageCount: action.hasNotRead.length,
                hasRead: action.hasRead,
                hasNotRead: action.hasNotRead
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
                hasNotRead: action.hasNotRead,
                hasRead: action.hasRead,
                isLoading: false,
                unreadMessageCount: action.hasNotRead.length
            }

        default :
            return state
    }
}
