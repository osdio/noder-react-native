// Require module
var React = require('react-native')
var ScrollableTabView = require('react-native-scrollable-tab-view')


var MessagePage = require('../components/MessagePage')
var TabBar = require('../components/TabBar')
var Return = require('../components/overlay/return')
var MarkAsReadOverlay = require('../components/overlay/markAsReadOverlay')


var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    StyleSheet,
    Image,
    SegmentedControlIOS,
    AlertIOS
    } = React


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            didFocus: false
        }
    }


    componentDidMount() {
        this.props.actions.getMessages(this.props.state.user.loginUser.token)
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
    }


    _onMarkAsReadOverlayPress() {

    }


    render() {
        let message = this.props.state.message
        let didFocus = this.state.didFocus
        let hasNotReadCount = message.hasNotRead.length
        let hasReadCount = message.hasRead.length

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    edgeHitWidth={(width/3)*2}
                    renderTabBar={()=>TabBar}>
                    <MessagePage
                        didFocus={didFocus}
                        isLoading={message.isLoading}
                        data={message.hasNotRead}
                        style={styles.userTopicPage}
                        tabLabel={"未读消息 " + hasNotReadCount}/>
                    <MessagePage
                        didFocus={didFocus}
                        isLoading={message.isLoading}
                        data={message.hasRead}
                        style={styles.userTopicPage}
                        tabLabel={"已读消息 " + hasReadCount}/>
                </ScrollableTabView>

                <Return></Return>
                <MarkAsReadOverlay
                    isLoading={this.state.marking}
                    onPress={this._onMarkAsReadOverlayPress.bind(this)}
                    ></MarkAsReadOverlay>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: height
    }
})


module.exports = Message
