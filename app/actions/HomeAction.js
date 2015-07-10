var types = require('../constants/ActionTypes')
var UserService = require('../services/userService')


exports.openLoginModal = function () {
    return {
        type: types.OPEN_LOGIN_MODAL,
        isModalOpen: true
    }
}

exports.closeLoginModal = function () {
    return {
        type: types.CLOSE_LOGIN_MODAL,
        isModalOpen: false
    }
}


exports.checkToken = function (token) {
    return dispatch=> {
        UserService.req.checkToken(token)
            .then(user=> {
                userTemp = user
                return userService.req.getLoginUserInfo(user)
            })
            .then((userInfo)=> {
                if (userInfo) {
                    this.setState({
                        isModalOpen: false
                    })
                    this.props.onLoginSuccess({
                        user: userTemp,
                        userInfo: userInfo
                    })
                }
            })
            .catch(function (err) {
                console.warn(err);
            })
            .done()
    }
}
