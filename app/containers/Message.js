// Require module
var React = require('react-native')
var Icon = require('FAKIconImage')
var MessagePage = require('../components/MessagePage')
var TabBar = require('../components/TabBar')


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
        this.state({
            didFocus: false
        })
    }


    componentDidMount() {
        this.props.actions.getMessages(this.props.state.user.loginUser.token)
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
    }


    render() {
        let actions = this.props.actions
        let message = this.props.state.message
        let didFocus = this.state.didFocus

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
                        tabLabel="未读消息"/>
                    <MessagePage
                        didFocus={didFocus}
                        isLoading={message.isLoading}
                        data={message.hasRead}
                        style={styles.userTopicPage}
                        tabLabel="已读消息"/>
                </ScrollableTabView>
            </View>
        )
    }
}


var styles = StyleSheet.create({})


module.exports = Message
