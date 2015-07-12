var types = require('../constants/ActionTypes')


var initialState = {
    loginUser: null,
    otherUser: null
}

module.exports = function (state, action) {
    state = state || initialState
    switch (action.type) {
        case types.GET_USER:
            return {
                ...state,
                loginUser: action.user
            }
        case types.FETCH_USER:
            return {
                ...state,
                loginUser: action.user
            }
        default:
            return state
    }
}
