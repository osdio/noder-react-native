var React = require('react-native')
var Modal = require('react-native-modal')
var Button = require('react-native-button')
var Icon = require('FAKIconImage')
var Camera = require('react-native-camera')


var Storage = require('../util/storage')
var userService = require('../services/userService')

var config = require('../config/config')
var routes = require('../config/routes')

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
    Navigator,
    AsyncStorage
    } = React;


var styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        backgroundColor: 'transparent'
    },
    row: {
        height: 40,
        backgroundColor: '#3498DB',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        height: 40,
        width: 30,
        marginRight: 10
    },
    closeIcon: {
        height: 20,
        width: 20
    },
    closeButton: {
        position: 'absolute',
        //borderColor: 'rgba(255,255,255,0.6)',
        borderRadius: 2,
        //borderWidth: 1,
        right: 20,
        top: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    buttonText: {
        color: 'rgba(255,255,255,0.8)'
    }
})

var modalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    modal: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 3,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingTop: 40,
        paddingBottom: 40,
        margin: 20
    }
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            isModalOpen: nextProps.isModalOpen
        })
    }


    closeModal() {
        this.setState({
            isModalOpen: false
        })
    }

    openModal() {
        this.setState({
            isModalOpen: true
        })
    }


    _getCustomCloseButton() {
        return (
            <View style={styles.closeButton}>
                <Button>
                    <Icon
                        name='ion|ios-close-empty'
                        size={30}
                        color='rgba(255,255,255,0.5)'
                        style={styles.closeIcon}/>
                </Button>
            </View>
        )
    }

    _onLoginPress() {
        routes.toQRCode(this, {
            onSuccess: this._onSuccess.bind(this)
        })
    }

    _onSuccess(token) {
        this._checkToken(token)
    }


    _checkToken(token) {
        var userTemp = null
        userService.req.checkToken(token)
            .then(user=> {
                userTemp = user
                return userService.req.getLoginUserInfo(user)
            })
            .then((userInfo)=> {
                if (userInfo) {
                    this.setState({
                        isModalOpen: false
                    })
                    this.props.onLoginSuccess({
                        user: userTemp,
                        userInfo: userInfo
                    })
                }
            })
            .catch(function (err) {
                console.warn(err);
            })
            .done()
    }


    render() {

        return (
            <Modal
                customCloseButton={this._getCustomCloseButton()}
                style={modalStyles}
                onPressBackdrop={this.closeModal.bind(this)}
                hideCloseButton={false}
                backdropType='blur'
                backdropBlur='dark'
                isVisible={this.state.isModalOpen}
                onClose={() => this.closeModal()}>

                <View style={styles.wrapper}>
                    <View style={styles.row}>
                        <Button
                            onPress={this._onLoginPress.bind(this)}
                            style={styles.button}>
                            <Icon
                                name='ion|camera'
                                size={28}
                                color='rgba(255,255,255,0.7)'
                                style={styles.icon}/>
                            <Text style={styles.buttonText}>扫码登陆</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }
}


module.exports = Login
