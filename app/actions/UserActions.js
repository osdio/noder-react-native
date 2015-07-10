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
        var userTemp = {}
        UserService.storage.getUser()
            .then((user)=> {
                console.log('haveLoadedUser');
                if (user) {
                    dispatch({
                        type: types.GET_USER_FROM_STORAGE,
                        user: user
                    })
                    userTemp = user
                    return UserService.req.getLoginUserInfo(user)
                }
                else {
                    throw 'getUserFromStorageFailed'
                }

            })
            .then(userFetched=> {
                console.log('fetchUser');
                if (userFetched) {
                    var userUpdated = Object.assign(userTemp, userFetched)
                    Storage.setItem('user', userUpdated)
                    dispatch({
                        type: types.FETCH_USER,
                        user: userUpdated
                    })
                }
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


exports.fetchUser = function fetchUser(user) {
    return dispatch => {
        UserService.req.getLoginUserInfo(user)
            .then(userInfo=> {
                console.log('fetchUser');
                if (userInfo) {
                    var userUpdated = Object.assign(user, userInfo)
                    Storage.setItem('user', userUpdated)
                    dispatch(getUser(userUpdated))
                }
            })
            .catch(err=> {
                console.warn(err)
            })
            .done()
    }
}
