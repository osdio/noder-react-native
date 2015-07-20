var React = require('react-native')

var Button = require('react-native-button')
var OverlayButton = require('./OverlayButton')

var window = require('../../util/window')
var { width, height } = window.get()


var {
    View,
    StyleSheet,
    Component,
    Text,
    ActivityIndicatorIOS
    } = React

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


    _onPress() {
        if (this.props.message.hasNotRead.length == 0) {
            window.alert('暂无未读消息!')
        }
        else {
            this.props.markAsRead(this.props.token)
        }
    }


    _renderContent() {
        if (this.props.isLoading) {
            return (
                <ActivityIndicatorIOS/>
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
                onPress={this._onPress.bind(this)}>
                <View style={styles.content}>
                    {this._renderContent()}
                </View>
            </OverlayButton>
        )
    }
}


module.exports = MarkAsRead
