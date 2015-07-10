var types = require('../constants/ActionTypes')
var user = require('../mock/user')

var initialState = null

module.exports = function (state, action) {
    state = state || initialState
    switch (action.type) {
        case types.GET_USER:
            return action.user
        case types.FETCH_USER:
            return action.user
        default:
            return state

    }
}
