// React-Native Module
var React = require('react-native')
var moment = require('moment')
var ScrollableTabView = require('react-native-scrollable-tab-view')
var { Icon, } = require('react-native-icons')


// Custom Component
var UserTopicPage = require('../components/UserTopicPage')
var Return = require('../components/overlay/Return')
var TabBar = require('../components/TabBar')
var Setting = require('../components/Setting')


var genColor = require('../util/genColor')
var UserService = require('../services/UserService')
var window = require('../util/window')
var { width, height } = window.get()

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
    TouchableOpacity,
    Navigator,
    ActivityIndicatorIOS,
    LayoutAnimation
    } = React


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: null,
            wallColor: genColor(),
            didFocus: false,
            isSettingModalOpen: false
        }
    }


    componentDidMount() {
        if (this.props.isLoginUser) {
            this.props.actions.fetchUser(this.props.state.user)
        }
        else {
            this._getUserInfo()
        }
    }


    componentDidFocus() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            didFocus: true
        })
    }


    _onGithubPress(name) {
        if (name == '' || !name) return
        window.link('https://github.com/' + name)
    }


    onSettingModalClosePress() {
        this.setState({
            isSettingModalOpen: false
        })
    }


    onSettingIconPress() {
        this.setState({
            isSettingModalOpen: true
        })
    }


    _getUserInfo() {
        let userName = this.props.userName

        UserService.req.getUserInfo(userName)
            .then(userInfo=> {
                console.log('get userINfo');
                this.setState({
                    userInfo: userInfo
                })
            })
            .catch(err=> {
                console.warn(err)
                if (err == 'UserNotExist') {
                    window.alert('用户不存在')
                    this.props.router.pop()
                }
            })
            .done()
    }


    _renderUserTopics(userInfo) {
        let recentReplies = userInfo.recent_replies
        let recentTopics = userInfo.recent_topics
        if (this.state.didFocus) {
            return (
                <View style={styles.list}>
                    <ScrollableTabView
                        edgeHitWidth={(width/3)*2}
                        renderTabBar={()=><TabBar></TabBar>}>
                        <UserTopicPage
                            router={this.props.router}
                            style={styles.userTopicPage}
                            data={recentReplies}
                            tabLabel="最近回复"/>
                        <UserTopicPage
                            router={this.props.router}
                            style={styles.userTopicPage}
                            data={recentTopics}
                            tabLabel="最近发布"/>
                    </ScrollableTabView>
                </View>
            )
        }

        if (this.props.isLoginUser) {
            return (
                <ActivityIndicatorIOS
                    hidesWhenStopped={true}
                    size="large"
                    animating={true}
                    style={styles.loading}/>
            )
        }

    }


    render() {
        var userInfo = this.state.userInfo

        let isLoginUser = this.props.isLoginUser

        if (isLoginUser) {
            userInfo = this.props.state.user
        }

        if (!userInfo) {
            return (
                <View style={styles.container}>
                    <ActivityIndicatorIOS
                        hidesWhenStopped={true}
                        size="large"
                        animating={true}
                        style={styles.loading}/>
                </View>

            )
        }
        let imgUri = window.parseImgUrl(userInfo.avatar_url)
        let createTime = moment(userInfo.create_at).format('l')
        let authorName = userInfo.loginname
        let githubName = userInfo.githubUsername
        let pubTopicIcon = (
            <TouchableOpacity
                onPress={()=>{
                    this.props.router.toPublish()
                }}
                >
                <Icon
                    name='ion|ios-compose'
                    size={34}
                    color='rgba(255,255,255,0.7)'
                    style={styles.icon}/>
            </TouchableOpacity>
        )

        let settingIcon = (
            <TouchableOpacity
                onPress={this.onSettingIconPress.bind(this)}
                >
                <Icon
                    name='ion|ios-gear'
                    size={34}
                    color='rgba(255,255,255,0.7)'
                    style={styles.icon}/>
            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>
                <View style={[styles.bgWall,{backgroundColor:this.state.wallColor}]}>
                    <View style={styles.imgRow}>

                        {isLoginUser ? pubTopicIcon : null}

                        <TouchableOpacity
                            onPress={this._onGithubPress.bind(this, githubName)}>
                            <Image
                                style={styles.authorImg}
                                source={{uri:imgUri}}>
                            </Image>
                        </TouchableOpacity>

                        {isLoginUser ? settingIcon : null}

                    </View>


                    <TouchableOpacity
                        onPress={this._onGithubPress.bind(this, authorName)}>
                        <Text style={styles.github}>
                            {authorName}
                        </Text>
                    </TouchableOpacity>


                    <View style={styles.bgWallFooter}>
                        <Text style={styles.bgWallFooterText}>
                            {'注册时间: ' + createTime}
                        </Text>

                        <Text style={styles.bgWallFooterText}>
                            {'积分:' + userInfo.score}
                        </Text>
                    </View>
                </View>
                {this._renderUserTopics(userInfo)}

                <Return router={this.props.router}></Return>


                <Setting
                    actions={this.props.actions}
                    router={this.props.router}
                    isModalOpen={this.state.isSettingModalOpen}
                    closeModal={this.onSettingModalClosePress.bind(this)}
                    ></Setting>
            </View>
        )
    }
}

var bgWallHeight = 160
var authorWrapperHeight = 100
var authorImgSize = 60
var fontColor = 'rgba(255,255,255,0.7)'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    loading: {
        flex: 1,
        width: width
    },
    bgWall: {
        height: bgWallHeight,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    imgRow: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    icon: {
        width: 30,
        height: authorImgSize
    },
    authorWrapper: {
        height: authorWrapperHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    authorImg: {
        height: authorImgSize,
        width: authorImgSize,
        borderRadius: authorImgSize / 2
    },
    bgWallFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width
    },
    bgWallFooterText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)'
    },
    github: {
        color: fontColor
    },
    userTopicPage: {
        height: height - bgWallHeight - 70
    },
    list: {
        width: width
    }

})


module.exports = User


