var React = require('react-native')
var App = require('./app/containers/App')

var user = require('./app/mock/user')
var userInfo = require('./app/mock/userInfo')
var userService = require('./app/services/userService')


// on run
require('./app/config/onRun')

Object.assign(user, userInfo)


var {
    Component,
    AppRegistry
    } = React


class Noder extends Component {

    componentDidMount() {
        //userService.storage.saveUser(user)
    }

    render() {
        return (
            <App></App>
        )
    }
}

AppRegistry.registerComponent('noder', () => Noder)
