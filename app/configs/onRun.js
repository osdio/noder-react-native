var React = require('react-native')
var storage = require('../util/storage')

var packageObj = require('../../package.json')

var {
    StatusBarIOS
    } = React

//storage.clear()

StatusBarIOS.setHidden(true, false)


global.__packageObj__ = packageObj
