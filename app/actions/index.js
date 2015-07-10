var user = require('./UserActions')
var home = require('./HomeAction')

var actions = {}

Object.assign(actions, user, home)

module.exports = actions
