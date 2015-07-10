var React = require('react-native')


var UserOverlay = require('../components/overlay/userOverlay')
var Login = require('../components/login')
var TopicsInTab = require('../components/topicsInTab')
var MessageOverlay = require('../components/overlay/messageOverlay')


var routes = require('../config/routes')

var config = require('../config/config')
var window = require('../util/window')
var { width, height } = window.get()


var {
    View,
    Component,
    PropTypes,
    Text,
    StyleSheet,
    Image,

    } = React

class Home extends Component {
    constructor(props) {
        super(props)
    }

    _onLoginSuccess() {
        this.setState({
            isModalOpen: false
        })
    }

    _userOverlayOnPress() {
        let actions = this.props.actions
        let state = this.props.state
        if (!state.user) {
            actions.openLoginModal()
        }
        else {
            routes.toUser(this)
        }
    }


    render() {
        return (
            <View
                style={[styles.container]}>
                <Image
                    style={{height:height,width:width}}
                    source={{uri:config.bgImgUri}}>

                    <TopicsInTab/>
                </Image>

                <UserOverlay
                    ref='userOverlay'
                    user={this.props.state.user}
                    onPress={this._userOverlayOnPress.bind(this)}
                    />


                <Login
                    ref='login'
                    onLoginSuccess={this._onLoginSuccess.bind(this)}
                    isModalOpen={this.props.state.home.isModalOpen}
                    actions={this.props.actions}
                    />

            </View>
        )
    }
}

Home.propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object
}

var styles = StyleSheet.create({
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

module.exports = Home
