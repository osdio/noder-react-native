// Require module
var React = require('react-native')
var ScrollableTabView = require('react-native-scrollable-tab-view')


var MessagePage = require('../components/MessagePage')
var TabBar = require('../components/TabBar')
var Return = require('../components/overlay/Return')
var MarkAsReadOverlay = require('../components/overlay/MarkAsReadOverlay')


var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    Text,
    Component,
    StyleSheet
    } = React


class Message extends Component {
    constructor(props) {
        super(props)
        this.state = {
            didFocus: false
        }
    }


    componentDidMount() {
        this.props.actions.getMessages(this.props.state.user.token)
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
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
                        router={this.props.router}
                        didFocus={didFocus}
                        isLoading={message.isLoading}
                        data={message.hasNotRead}
                        style={styles.userTopicPage}
                        tabLabel={"未读消息 " + hasNotReadCount}/>
                    <MessagePage
                        router={this.props.router}
                        didFocus={didFocus}
                        isLoading={message.isLoading}
                        data={message.hasRead}
                        style={styles.userTopicPage}
                        tabLabel={"已读消息 " + hasReadCount}/>
                </ScrollableTabView>

                <Return router={this.props.router}/>
                <MarkAsReadOverlay
                    isLoading={message.isMarkAsReadLoading}
                    markAsRead={this.props.actions.markAsRead}
                    message={message}
                    token={this.props.state.user.token}
                    />
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
