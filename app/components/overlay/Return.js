var React = require('react-native')

var Button = require('react-native-button')
var { Icon } = require('react-native-icons')

var OverlayButton = require('./OverlayButton')


var window = require('../../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    Navigator
    } = React;


var returnSize = 45


var styles = StyleSheet.create({
    returnIcon: {
        height: returnSize,
        width: returnSize,
        borderRadius: returnSize / 2
    }
})


class Return extends Component {
    constructor(props) {
        super(props)
    }


    _onPress() {
        this.props.router && this.props.router.pop && this.props.router.pop()
    }


    render() {
        return (
            <OverlayButton
                onPress={this._onPress.bind(this)}>
                <Icon
                    name='ion|ios-arrow-thin-left'
                    size={30}
                    color='rgba(255,255,255,1)'
                    style={styles.returnIcon}/>
            </OverlayButton>
        )
    }
}

module.exports = Return
