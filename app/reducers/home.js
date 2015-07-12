var types = require('../constants/ActionTypes')

var initialState = {
    isModalOpen: false,
    checkTokenLoading: false
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
        case types.CHECK_TOKEN_REQUREST:
            return {
                ...state,
                checkTokenLoading: true
            }
        case types.CHECK_TOKEN_SUCCESS:
            return {
                isModalOpen: false,
                checkTokenLoading: false
            }
        default :
            return state
    }
}
