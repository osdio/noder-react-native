var React = require('react-native');

var Button = require('react-native-button');
var OverlayButton = require('./overlayButton');
var window = require('../../util/window');
var { width, height } = window.get()

var config = require('../../config');



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
    ActivityIndicatorIOS
    } = React;

var overlaySize = 45


var styles = StyleSheet.create({
    position: {
        right: 20,
        bottom: 20
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12
    },
    content: {
        height: overlaySize,
        width: overlaySize,
        borderRadius: overlaySize / 2,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})


class MarkAsRead extends Component {
    constructor(props) {
        super(props)
    }


    _renderContent() {
        if (this.props.isLoading) {
            return (
                <ActivityIndicatorIOS></ActivityIndicatorIOS>
            )
        }
        return (
            <Text style={[styles.text]}>
                已读
            </Text>
        )
    }


    render() {
        return (
            <OverlayButton
                position={styles.position}
                onPress={this.props.onPress}>
                <View style={styles.content}>
                    {this._renderContent()}
                </View>
            </OverlayButton>
        )
    }
}


module.exports = MarkAsRead