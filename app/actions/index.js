var user = require('./UserActions')
var home = require('./HomeAction')
var message = require('./MessageAction')

var actions = {}

Object.assign(actions, user, home, message)

module.exports = actions
