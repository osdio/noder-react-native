var types = require('../constants/ActionTypes')
var UserService = require('../services/userService')


exports.getUser = function getUser(user) {
    return {
        type: types.GET_USER,
        user: user
    }
}


exports.getUserFromStorage = function getUserFromStorage() {
    return dispatch=> {
        UserService.storage.getUser()
            .then((user)=> {
                console.log('haveLoadedUser');
                dispatch({
                    type: types.GET_USER_FROM_STORAGE,
                    user: user
                })
            })
            .catch((err)=> {
                dispatch({
                    type: types.GET_USER_FROM_STORAGE_FAILED,
                    err: err
                })
            })
            .done()
    }
}
