var React = require('react-native')
var Home = require('./Home')
var Router = require('../configs/Router')

var {
    PropTypes,
    Component,
    Navigator
    } = React


class Navitation extends Component {
    constructor(props) {
        super(props)
        this.initialRoute = {
            name: 'home',
            index: 0,
            component: Home
        }
    }


    componentDidMount() {
        this.props.actions.getLoginUserFromStorage()
        this.props.actions.getAllTopicsFromStorage()

        this.navigator.navigationContext.addListener('didfocus', e => {
            let route = e.data.route
            this[route.name] && this[route.name].componentDidFocus && this[route.name].componentDidFocus()
        })
    }


    renderScene(route, navigator) {
        if (route.component) {
            return React.createElement(route.component, Object.assign({}, route.props,
                {
                    ref: view=>this[route.name] = view,
                    actions: this.props.actions,
                    state: this.props.state,
                    router: new Router(navigator)
                }
            ))
        }
    }


    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig
        }
        return Navigator.SceneConfigs.FloatFromRight
    }


    render() {
        return (
            <Navigator
                ref={view => this.navigator=view}
                initialRoute={this.initialRoute}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                />
        )
    }
}

Navitation.propTypes = {
    actions: PropTypes.object
}


module.exports = Navitation
