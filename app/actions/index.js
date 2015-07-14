var user = require('./UserActions')
var home = require('./HomeActions')
var message = require('./MessageActions')
var topic = require('./TopicActions')

var actions = {}

Object.assign(actions, user, home, message, topic)

module.exports = actions
