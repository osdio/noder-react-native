var React = require('react-native')
// var storage = require('../services/Storage')

var packageObj = require('../../package.json')

var {
    StatusBarIOS
    } = React

// storage.clear()

StatusBarIOS.setHidden(true, false)


global.__packageObj__ = packageObj
