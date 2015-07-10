var types = require('../constants/ActionTypes')

var initialState = {
    isModalOpen: false
}


module.exports = function (state, action) {
    state = state || initialState
    switch (action.type) {
        case types.OPEN_LOGIN_MODAL:
            return {
                isModalOpen: true
            }
        case types.CLOSE_LOGIN_MODAL:
            return {
                isModalOpen: false
            }

        default :
            return state
    }
}
