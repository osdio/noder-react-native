var React = require('react-native')
var { Icon, } = require('react-native-icons')

var OverlayButton = require('./overlayButton')

var routes = require('../../configs/routes')

var window = require('../../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    StyleSheet,
    Image
    } = React;


class MessageOverlay extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUnreadCount(this.props.user.token)
    }


    _renderMessageCount() {
        var count = this.props.count

        if (count > 0) {
            return (
                <View style={styles.countWrapper}>
                    <Text style={styles.countText}>
                        {count > 999 ? '1k+' : count}
                    </Text>
                </View>
            )
        }

        return null
    }


    _onPress() {
        this.props.router.toMessage()
    }


    render() {
        if (this.props.user) {
            return (
                <OverlayButton
                    position={styles.position}
                    onPress={this._onPress.bind(this)}>
                    <Icon
                        name='ion|ios-email-outline'
                        size={28}
                        color='rgba(255,255,255,0.9)'
                        style={styles.icon}/>

                    {this._renderMessageCount()}
                </OverlayButton>
            )
        }
        return null
    }
}


var overlaySize = 45
var countBoxSize = 20
var countTextSize = 10


var styles = StyleSheet.create({
    icon: {
        height: overlaySize,
        width: overlaySize,
        borderRadius: overlaySize / 2
    },
    countWrapper: {
        height: countBoxSize,
        width: countBoxSize,
        borderRadius: countBoxSize / 2,
        backgroundColor: 'red',
        position: 'absolute',
        right: -5,
        top: -5
    },
    countText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: countTextSize,
        lineHeight: countBoxSize - countTextSize / 2,
        textAlign: 'center',
        height: countBoxSize,
        width: countBoxSize,
        borderRadius: countBoxSize / 2,
    },
    position: {
        right: 20,
        bottom: 20
    },
    container: {
        backgroundColor: 'blue',
        borderRadius: overlaySize / 2
    }
})


module.exports = MessageOverlay
