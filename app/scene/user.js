var React = require('react-native')
var moment = require('moment')
var ScrollableTabView = require('react-native-scrollable-tab-view')

var UserTopicPage = require('../components/userTopicPage')


var genColor = require('../util/genColor')
var userService = require('../services/userService')
var config = require('../config')
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
    ActivityIndicatorIOS
    } = React


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: this.props.userInfo,
            user: this.props.user,
            wallColor: genColor(),
            didFocus: false
        }
    }


    componentDidMount() {
        this._getUserInfo()
    }


    componentDidFocus() {
        this.setState({
            didFocus: true
        })
    }


    _onGithubPress(name) {
        window.link('https://github.com/' + name)
    }


    _getUserInfo() {
        let userName = this.props.userName
        let user = this.state.user
        var result = user ? userService.req.getLoginUserInfo(user) : userService.req.getUserInfo(userName)


        result
            .then(userInfo=> {
                //console.log('update');
                this.setState({
                    userInfo: userInfo
                })
            })
            .catch(err=> {
                console.warn(err)
                if (err == 'UserNotExist') {
                    window.alert('用户不存在')
                    Navigator.getContext(this).pop()
                }
            })
            .done()
    }


    _renderUserTopics(userInfo) {
        let recentReplies = userInfo.recent_replies
        let recentTopics = userInfo.recent_topics
        let collectTopics = userInfo.collect_topics
        if (this.state.didFocus) {
            return (
                <View style={styles.list}>
                    <ScrollableTabView>
                        <UserTopicPage
                            style={styles.userTopicPage}
                            data={recentReplies}
                            tabLabel="最近回复"/>
                        <UserTopicPage
                            style={styles.userTopicPage}
                            data={recentTopics}
                            tabLabel="最近发布"/>
                        <UserTopicPage
                            style={styles.userTopicPage}
                            data={collectTopics}
                            tabLabel="收藏"/>
                    </ScrollableTabView>
                </View>
            )
        }
    }


    render() {
        let userInfo = this.state.userInfo
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
        let imgUri = config.domain + userInfo.avatar_url
        let createTime = moment(userInfo.create_at).format('l')
        let authorName = userInfo.githubUsername

        return (
            <View style={styles.container}>
                <View style={[styles.bgWall,{backgroundColor:this.state.wallColor}]}>
                    <TouchableOpacity
                        onPress={this._onGithubPress.bind(this, authorName)}>
                        <Image
                            style={styles.authorImg}
                            source={{uri:imgUri}}>
                        </Image>
                    </TouchableOpacity>

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
        flex: 1
    },
    bgWall: {
        height: bgWallHeight,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10
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
    }

})


module.exports = User


