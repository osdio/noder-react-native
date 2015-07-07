var React = require('react-native')

// Components
var User = require('../scene/user')
var Topic = require('../scene/topic')
var Comments = require('../scene/comments')
var Message = require('../scene/message')
var QRCode = require('../scene/qrCode')

// Config
var sceneConfig = require('./sceneConfig')


var {
    Navigator
    } = React

var customFloatFromRight = sceneConfig.customFloatFromRight


var push = function (context, props, route) {
    let navigator = Navigator.getContext(context)
    let routesList = navigator.getCurrentRoutes()
    let nextIndex = routesList[routesList.length - 1].index + 1
    route.props = props
    route.index = nextIndex
    navigator.push(route)
}


exports.push = push


exports.toUser = function (context, props) {
    push(context, props, {
        component: User,
        name: 'user',
        sceneConfig: customFloatFromRight
    })
}


exports.toTopic = function (context, props) {
    push(context, props, {
        component: Topic,
        name: 'topic',
        sceneConfig: customFloatFromRight
    })
}


exports.toComments= function (context, props) {
    push(context, props, {
        component: Comments,
        name: 'comments',
        sceneConfig: customFloatFromRight
    })
}


exports.toMessage = function (context, props) {
    push(context, props, {
        component: Message,
        name: 'message',
        sceneConfig: customFloatFromRight
    })
}


exports.toQRCode = function (context, props) {
    push(context, props, {
        component: QRCode,
        name: 'qrCode',
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom
    })
}