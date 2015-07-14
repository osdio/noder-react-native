var React = require('react-native')
var userService = require('../services/userService')
var storage=require('../util/storage')

var {
    StatusBarIOS
    } = React

//storage.clear()

StatusBarIOS.setHidden(true, false)
