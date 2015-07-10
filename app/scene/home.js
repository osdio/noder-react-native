var React = require('react-native')
var window = require('../util/window')
var { width, height } = window.get()

// custom component
var UserOverlay = require('../components/overlay/userOverlay')
var Login = require('../components/login')
var TopicsInTab = require('../components/topicsInTab')
var MessageOverlay = require('../components/overlay/messageOverlay')

var userService = require('../services/userService')

var config = require('../config/config')
var routes = require('../config/routes')
var styles = require('../styles/home')


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
    AsyncStorage
    } = React;


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            userInfo: null,
            isModalOpen: false,
            messagesCount: 0
        }
    }


    componentDidMount() {
        this._getUserFromStorage()
            .then((user)=> {
                this._fetchLoginUserInfo(user)
            })
            .done()
    }


    componentDidFocus() {
        let message = global.__message__
        if (message && message.topic_to_home) {
            this.setState({
                userInfo: message.topic_to_home.userInfo
            })
            userService.storage.saveUserInfo(message.topic_to_home.userInfo)
            message.topic_to_home = null
        }
        this.messageOverlay && this.messageOverlay.componentDidFocus()
    }


    _userOverlayOnPress() {
        if (!this.state.user) {
            this.setState({
                isModalOpen: true
            })
        }
        else {
            routes.toUser(this, {
                userInfo: this.state.userInfo,
                user: this.state.user
            })
        }
    }


    _onLoginSuccess(data) {
        this.setState({
            user: data.user,
            isModalOpen: false,
            userInfo: data.userInfo
        })
    }


    _getUserFromStorage() {
        return userService.storage.getUserAndUserInfo()
            .then((data)=> {
                //console.log('value:');
                //console.log(data);
                if (data) {
                    this.setState({
                        user: data.user,
                        userInfo: data.userInfo
                    })
                    global.__data__ = {
                        user: data.user,
                        userInfo: data.userInfo
                    }
                }
                return data.user
            })
            .catch((err)=> {
                console.log(err);
                this.setState({
                    user: null,
                    userInfo: null
                })
            })
    }


    _fetchLoginUserInfo(user) {
        if (!user) return
        userService.req.getLoginUserInfo(user)
            .then((userInfo => {
                this.setState({
                    userInfo: userInfo
                })
                global.__data__.userInfo = userInfo
            }))
            .catch((error)=> {
                console.warn(error);
            })
            .done()
    }


    _renderMessageCount() {
        if (this.state.user) {
            return (
                <MessageOverlay
                    ref={view=>this.messageOverlay=view}
                    user={this.state.user}/>
            )
        }
        return null
    }


    render() {
        return (
            <View
                style={[styles.container,stylesExtends.container]}>
                <Image
                    style={{height:height,width:width}}
                    source={{uri:config.bgImgUri}}>

                    <TopicsInTab/>
                </Image>

                <UserOverlay
                    ref='userOverlay'
                    user={this.state.user}
                    userInfo={this.state.userInfo}
                    onPress={this._userOverlayOnPress.bind(this)}/>


                {this._renderMessageCount()}


                <Login
                    ref='login'
                    navigator={this.props.navigator}
                    onLoginSuccess={this._onLoginSuccess.bind(this)}
                    isModalOpen={this.state.isModalOpen}/>

            </View>
        );
    }
}


var stylesExtends = StyleSheet.create({
    container: {
        width: width,
        "flex": 1,
        "backgroundColor": "transparent"
    },
    page: {
        width: width
    },
    scrollContainer: {
        height: height - 40,
        "flex": 1
    },
    listView: {
        backgroundColor: 'blue'
    },
    navScroll: {
        "height": 40,
        "backgroundColor": "rgba(0, 0, 0, 0.75)",
        "position": "absolute",
        "left": 0,
        "right": 0,
        "overflow": "hidden"
    }
});

module.exports = Home;
