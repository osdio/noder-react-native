var types = require('../constants/ActionTypes')

var initialState = {
    isLoading: false,
    hasNotRead: [],
    hasRead: [],
    unreadMessageCount: 0,
    isMarkAsReadLoading: false
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
                ...state,
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
                unreadMessageCount: action.hasNotRead.length,
                hasRead: action.hasRead,
                hasNotRead: action.hasNotRead,
                isLoading: false
            }

        case types.FETCH_MESSAGES_FAILED:
            return {
                ...state,
                isLoading: false,
            }

        case types.MARK_AS_READ_REQUEST:
            return {
                ...state,
                isMarkAsReadLoading: true
            }

        case types.MARK_AS_READ_SUCCESS:
            return {
                ...state,
                hasNotRead: [],
                hasRead: state.hasNotRead.concat(state.hasRead),
                unreadMessageCount: 0,
                isMarkAsReadLoading: false
            }

        case types.MARK_AS_READ_FAILED:
            return {
                ...state,
                isMarkAsReadLoading: false
            }

        default :
            return state
    }
}
