var React = require('react-native')
var Icon = require('FAKIconImage')


var OverlayButton = require('./overlayButton')
var Storage = require('../../util/storage')


var config = require('../../config/config')
var routes = require('../../config/routes')
var messageService = require('../../services/messageService')

var window = require('../../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    StyleSheet,
    Image,
    Navigator
    } = React;


class MessageOverlay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messagesCount: 0
        }
    }

    componentDidMount() {
        this._fetchMessage()
    }


    componentDidFocus() {
        //console.log('_fetchMessage()');
        this._fetchMessage()
    }


    _fetchMessage() {
        if (!this.props.user) return

        messageService.req.getMessageCount(this.props.user.token)
            .then(count=> {
                if (count > 0) {
                    this.setState({
                        messagesCount: count
                    })
                }
            })
            .catch(function (err) {
                console.warn(err)
            })
            .done()
    }


    _renderMessageCount() {
        var count = this.state.messagesCount

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
        routes.toMessage(this, {
            user: this.props.user
        })
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
        containerBackgroundColor: 'transparent',
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
