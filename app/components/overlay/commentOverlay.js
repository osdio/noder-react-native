var React = require('react-native');
var Dimensions = require('Dimensions');
var Icon = require('FAKIconImage');
var Button = require('react-native-button');


var OverlayButton = require('./overlayButton');


var config = require('../../config/config');

var { width, height } = Dimensions.get('window');


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

var iconSize = 12

var styles = StyleSheet.create({
    position: {
        right: 20,
        bottom: 20
    },
    commentText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 12,
        paddingLeft: 4
    },
    content: {
        height: overlaySize,
        width: overlaySize,
        borderRadius: overlaySize / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentIcon: {
        height: iconSize,
        width: iconSize,
    }
})


class CommentOverlay extends Component {
    constructor(props) {
        super(props)
    }


    _renderCommentReplyCount(count) {
        if (count > 999) {
            return '1k+'
        }
        return count
    }

    render() {
        return (
            <OverlayButton
                position={styles.position}
                onPress={this.props.onPress}>
                <View style={styles.content}>
                    <Icon
                        name='ion|chatbox'
                        size={13}
                        color='white'
                        style={styles.commentIcon}
                        />
                    <Text style={styles.commentText}>
                        {this._renderCommentReplyCount(this.props.topic.reply_count)}
                    </Text>
                </View>
            </OverlayButton>
        )
    }
}


module.exports = CommentOverlay
