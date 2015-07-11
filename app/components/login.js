var React = require('react-native')
var Modal = require('react-native-modal')
var Button = require('react-native-button')
var Icon = require('FAKIconImage')


var routes = require('../configs/routes')

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
    AsyncStorage,
    ActivityIndicatorIOS
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
    },
    loading: {
        paddingRight: 40,
        paddingLeft: 40,
        paddingTop: 10,
        paddingBottom: 10
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
    }


    closeModal() {
        this.props.actions.closeLoginModal()
    }


    _onLoginPress() {
        if (this.props.checkTokenLoading) return
        routes.toQRCode(this)
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


    _renderLoginButton() {
        if (this.props.checkTokenLoading) {
            return (
                <ActivityIndicatorIOS
                    hidesWhenStopped={false}
                    size="small"
                    animating={true}
                    color='white'
                    style={styles.loading}
                    />
            )
        }
        return (
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
        )
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
                isVisible={this.props.isModalOpen}
                onClose={() => this.closeModal()}>

                <View style={styles.wrapper}>
                    <View style={styles.row}>

                        {this._renderLoginButton()}
                    </View>
                </View>
            </Modal>
        )
    }


}


module.exports = Login
