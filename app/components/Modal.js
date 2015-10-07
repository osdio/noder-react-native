var React = require('react-native')
var { Icon } = require('react-native-icons')
var BlurView = require('react-native-blur').BlurView
var VibrancyView = require('react-native-blur').VibrancyView


var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS,
    Image,
    ListView,
    TouchableHighlight,
    Navigator,
    AsyncStorage,
    ActivityIndicatorIOS,
    Modal
    } = React;


class Modal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                animated={this.props.animated}
                onDismiss={this.props.onDismiss}
                transparent={this.props.transparent}
                >

            </Modal>
        )
    }

}


module.exports = Modal
