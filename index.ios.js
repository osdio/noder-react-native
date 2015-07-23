var React = require('react-native')
var App = require('./app/containers/App')

//var user = require('./app/mocks/user')
//var userInfo = require('./app/mocks/userInfo')
//var UserService = require('./app/services/UserService')
//Object.assign(user, userInfo)


// on run
require('./app/configs/onRun')



var {
    Component,
    AppRegistry
    } = React


class Noder extends Component {

    componentDidMount() {
        //UserService.storage.saveUser(user)
        //UserService.storage.clearUser()
    }

    render() {
        return (
            <App></App>
        )
    }
}

AppRegistry.registerComponent('noder', () => Noder)
