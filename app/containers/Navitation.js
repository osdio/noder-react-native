var React = require('react-native')
var Home = require('./Home')

var {
    PropTypes,
    Component,
    Navigator
    } = React


class Navitation extends Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.actions.getLoginUserFromStorage()
    }


    renderScene(route, navigator) {
        if (route.name == 'home') {
            return (
                <Home ref={view=>this[route.name]=view} state={this.props.state} navigator={navigator}
                      actions={this.props.actions}></Home>
            )
        }
        if (route.component) {
            return React.createElement.bind(this)(route.component, Object.assign({}, route.props,
                {
                    ref: view=>this[route.name] = view,
                    actions: this.props.actions,
                    state: this.props.state
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
                initialRoute={{name:'home', index:0}}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                onDidFocus={(route)=>{
                    this[route.name]&&this[route.name].componentDidFocus && this[route.name].componentDidFocus()
                }}
                />
        )
    }
}

Navitation.propTypes = {
    actions: PropTypes.object
}


module.exports = Navitation
