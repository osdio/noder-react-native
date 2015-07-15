// Require module
var React = require('react-native');
var window = require('../util/window');
var { width, height } = window.get()
var rebound = require('rebound');
var { Icon, } = require('react-native-icons')

// Component module
var PageScrollView = require('../components/pageScrollView');
var PageNavBar = require('../components/pageNavBar');
var Return = require('../components/overlay/return');
var MessageListView = require('../components/messageListView');
var MarkAsReadOverlay = require('../components/overlay/markAsReadOverlay');

// Util module
var Storage = require('../util/storage');
var messageService = require('../services/messageService');

// Config module
var config = require('../configs/config');


var {
    View,
    Text,
    Component,
    StyleSheet,
    Image,
    SegmentedControlIOS,
    AlertIOS
    } = React;


var styles = StyleSheet.create({
    page: {
        height: height - 40,
        width: width
    },
    container: {
        height: height,
        width: width,
        backgroundColor: 'white'
    }
})


class Message extends Component {
    constructor(props) {
        super(props)
        this.navs = ['未读', '已读'];
        this.totalPages = this.navs.length;
        this.space = (width - (60 * 3)) / 2 + 60;
        this.pageIndex = 0;
        var pageScrollContentWidth = width * this.pageIndex;
        var pageNavBarWith = (this.space / width) * pageScrollContentWidth;
        this.pageNavBarOffset = this.pageIndex == 0 ? 0 : (this.pageIndex * width / pageScrollContentWidth) * pageNavBarWith;

        this.state = {
            hasReadMessages: [],
            hasNotReadMessages: [],
            isLoading: false,
            navs: this.navs,
            marking: false
        }
    }


    componentWillMount() {
        this.springSystem = new rebound.SpringSystem();
        this._scrollSpring = this.springSystem.createSpring();
        this._updateSpringConfig(this.props);

        this._scrollSpring.addListener({
            onSpringUpdate: () => {
                var currentValue = this._scrollSpring.getCurrentValue();
                var space = this.space;
                var offset = currentValue.offset;
                var pageScrollContentWidth = currentValue.contentWidth;
                if (offset < 0 || offset > pageScrollContentWidth - width) {
                    return;
                }

                var pageNavBarWith = (space / width) * pageScrollContentWidth;
                var pageNavBarOffset = (offset / pageScrollContentWidth) * pageNavBarWith;

                this._pageNavBar.updateNav(pageNavBarOffset)
            }
        });
    }


    componentDidMount() {
        //this._getMessagesFromStorage()
        this._fetchMessages()
        this._scrollSpring.setCurrentValue({
            offset: 0,
            contentWidth: 0
        });
    }

    _updateSpringConfig(props) {
        var springConfig = this._scrollSpring.getSpringConfig();
        springConfig.tension = rebound.OrigamiValueConverter.tensionFromOrigamiValue(props.springTension || 25);
        springConfig.friction = rebound.OrigamiValueConverter.frictionFromOrigamiValue(props.springFriction || 8);

        this._scrollSpring.setOvershootClampingEnabled((typeof props.clampSpring === 'undefined') ? true : props.clampSpring);
    }


    pageScrollViewOnScroll(e) {
        var offset = e.nativeEvent.contentOffset.x;
        this._scrollSpring.setCurrentValue({
            offset: offset,
            contentWidth: e.nativeEvent.contentSize.width
        });
    }


    _fetchMessages() {
        var user = this.props.user

        if (!user) return

        this.setState({
            isLoading: true
        })

        messageService.req.get(user.token)
            .then((messages)=> {
                let hasReadMessages = messages.has_read_messages
                let hasNotReadMessages = messages.hasnot_read_messages

                this.setState({
                    hasReadMessages: hasReadMessages,
                    hasNotReadMessages: hasNotReadMessages,
                    isLoading: false,
                    navs: this._getCurentNavs(hasNotReadMessages, hasReadMessages)
                })
                messageService.storage.save(messages)
            })
            .catch(err=> {
                this.setState({
                    isLoading: true
                })
                console.warn(err)
            })
            .done()
    }


    _getMessagesFromStorage() {
        messageService.storage.get()
            .then(messages=> {
                if (!messages) return
                let hasReadMessages = messages.has_read_messages
                let hasNotReadMessages = messages.hasnot_read_messages
                this.setState({
                    hasReadMessages: hasReadMessages,
                    hasNotReadMessages: hasNotReadMessages,
                    navs: this._getCurentNavs(hasNotReadMessages, hasReadMessages)
                })
            })
            .catch(err=> {
                console.warn(err)
            })
            .done()
    }


    _onMessageListViewRefresh() {
        this._fetchMessages()
    }

    _onMarkAsReadOverlayPress() {
        if (this.state.hasNotReadMessages.length == 0) {
            return AlertIOS.alert('无未读的消息!')
        }

        var user = this.props.user

        if (!user || this.state.marking) return

        this.setState({
            marking: true
        })


        messageService.req.markAsRead(user.token)
            .then(data=> {
                if (data.success) {
                    var hasReadMessages = this.state.hasNotReadMessages.concat(this.state.hasReadMessages)
                    this.setState({
                        hasNotReadMessages: [],
                        hasReadMessages: hasReadMessages,
                        navs: this._getCurentNavs([], hasReadMessages),
                        marking: false
                    })
                    return AlertIOS.alert('已全部标记为已读!')
                }
                throw data
            })
            .catch(err=> {
                this.setState({
                    marking: false
                })
                AlertIOS.alert('标记失败!')
                console.warn(err);
            })
            .done()
    }


    _getCurentNavs(hasNotReadMessages, hasReadMessages) {
        return [
            '未读 ' + hasNotReadMessages.length,
            '已读 ' + hasReadMessages.length
        ]
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{height:40}}>
                    <PageNavBar
                        navBarOffset={this.pageNavBarOffset}
                        pageIndex={this.pageIndex}
                        space={this.space}
                        navs={this.state.navs}
                        totalPages={this.totalPages}
                        ref={view => {this._pageNavBar = view}}>
                    </PageNavBar>
                </View>


                <PageScrollView
                    pageIndex={this.pageIndex}
                    totalPages={this.totalPages}
                    onScroll={this.pageScrollViewOnScroll.bind(this)}
                    onScrollBeginDrag={this.pageScrollViewOnScroll.bind(this)}
                    >

                    <MessageListView
                        user={this.props.user}
                        refresh={this._onMessageListViewRefresh.bind(this)}
                        isLoading={this.state.isLoading}
                        messages={this.state.hasNotReadMessages}></MessageListView>
                    <MessageListView
                        user={this.props.user}
                        refresh={this._onMessageListViewRefresh.bind(this)}
                        isLoading={this.state.isLoading}
                        messages={this.state.hasReadMessages}></MessageListView>


                </PageScrollView>


                <Return></Return>
                <MarkAsReadOverlay
                    isLoading={this.state.marking}
                    onPress={this._onMarkAsReadOverlayPress.bind(this)}
                    ></MarkAsReadOverlay>
            </View>
        )
    }
}

module.exports = Message
