var React = require('react-native')
var { Icon, } = require('react-native-icons')

var OverlayButton = require('./OverlayButton')

var config = require('../../configs/config')

var window = require('../../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    StyleSheet,
    Image
    } = React;


var overlaySize = 45

var styles = StyleSheet.create({
    userImg: {
        borderWidth: 2,
        borderColor: '#2C3E50'
    },
    icon: {
        height: overlaySize,
        width: overlaySize,
        borderRadius: overlaySize / 2
    }
})


class UserOverlay extends Component {
    constructor(props) {
        super(props)
    }


    _renderOverlayContent() {
        if (this.props.user.id) {
            return (
                <Image
                    style={[styles.icon,styles.userImg]}
                    source={{uri:config.domain+this.props.user.avatar_url}}>
                </Image>
            )
        }

        return (
            <Icon
                name='ion|ios-person'
                size={28}
                color='rgba(255,255,255,0.9)'
                style={styles.icon}/>
        )
    }


    render() {
        return (
            <OverlayButton
                onPress={this.props.onPress}>
                {this._renderOverlayContent()}
            </OverlayButton>
        )
    }
}

module.exports = UserOverlay
