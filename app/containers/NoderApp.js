var React = require('react-native')
var Redux = require('redux')
var Navigation = require('./Navitation')
var NoderActions = require('../actions')

var {bindActionCreators} = Redux

var {
    Connector
    } = require('redux/react-native')

var {
    Component,
    Navigator
    } = React


class NoderApp extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Connector select={state => state}>
                {this.renderChild}
            </Connector>
        )
    }


    renderChild(state) {
        var actions = bindActionCreators(NoderActions, state.dispatch)
        return (
            <Navigation state={state} actions={actions}></Navigation>
        )
    }
}


module.exports = NoderApp
