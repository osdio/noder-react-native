var React = require('react-native')

// Components
var User = require('../containers/User')
var Topic = require('../scene/topic')
var Comments = require('../scene/comments')
var Message = require('../containers/Message')
var QRCode = require('../containers/QRCode')

// Config
var sceneConfig = require('./sceneConfig')


var {
    Navigator
    } = React

var customFloatFromRight = sceneConfig.customFloatFromRight


class Router {
    constructor(navigator) {
        this.navigator = navigator
    }

    push(props, route) {
        let routesList = this.navigator.getCurrentRoutes()
        let nextIndex = routesList[routesList.length - 1].index + 1
        route.props = props
        route.index = nextIndex
        this.navigator.push(route)
    }


    pop() {
        this.navigator.pop()
    }


    toUser(props) {
        this.push(props, {
            component: User,
            name: 'user',
            sceneConfig: customFloatFromRight
        })
    }

    toTopic(props) {
        this.push(props, {
            component: Topic,
            name: 'topic',
            sceneConfig: customFloatFromRight
        })
    }

    toComments(props) {
        this.push(props, {
            component: Comments,
            name: 'comments',
            sceneConfig: customFloatFromRight
        })
    }

    toMessage(props) {
        this.push(props, {
            component: Message,
            name: 'message',
            sceneConfig: customFloatFromRight
        })
    }

    toQRCode(props) {
        this.push(props, {
            component: QRCode,
            name: 'qrCode',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom
        })
    }
}

module.exports = Router

