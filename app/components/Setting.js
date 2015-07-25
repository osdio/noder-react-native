var React = require('react-native')
var Modal = require('react-native-modal')
var Button = require('react-native-button')
var { Icon, } = require('react-native-icons')


var window = require('../util/window')
var { width, height } = window.get()

var {
    View,
    StyleSheet,
    ScrollView,
    Component,
    Text,
    StatusBarIOS,
    ActivityIndicatorIOS,
    TouchableOpacity
    } = React


class Setting extends Component {
    constructor(props) {
        super(props)
    }


    onAboutPress() {
        this.props.router.toAbout()
    }


    onLogoutPress() {
        this.props.actions.logout()
        this.props.router.replaceWithHome()
    }


    onClearPress() {
        this.props.actions.clear()
        window.alert('缓存清除成功!')
    }


    render() {
        return (
            <Modal
                style={modalStyles}
                //onPressBackdrop={() => this.props.closeModal()}
                hideCloseButton={true}
                backdropType='blur'
                backdropBlur='dark'
                isVisible={this.props.isModalOpen}
                onClose={() => this.props.closeModal()}>

                <View style={styles.wrapper}>
                    <View style={[styles.row,styles.header]}>
                        <Icon
                            name='ion|ios-gear'
                            size={25}
                            color='rgba(255,255,255,0.5)'
                            style={styles.Icon}/>
                        <Text style={styles.rowText}>
                            设置
                        </Text>
                    </View>


                    <TouchableOpacity onPress={this.onAboutPress.bind(this)}>
                        <View style={[styles.row]}>
                            <Icon
                                name='ion|ios-eye'
                                size={25}
                                color='rgba(255,255,255,0.5)'
                                style={styles.Icon}/>
                            <Text style={styles.rowText}>
                                关于
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onClearPress.bind(this)}>
                        <View style={[styles.row]}>
                            <Icon
                                name='ion|ios-trash'
                                size={22}
                                color='rgba(255,255,255,0.5)'
                                style={styles.Icon}/>
                            <Text style={styles.rowText}>
                                清除缓存
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.onLogoutPress.bind(this)}>
                        <View style={[styles.row]}>
                            <Icon
                                name='ion|power'
                                size={20}
                                color='#E74C3C'
                                style={styles.Icon}/>
                            <Text style={[styles.rowText,styles.logoutText]}>
                                退出
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>


                <TouchableOpacity onPress={() => this.props.closeModal()}>
                    <Icon
                        name='ion|ios-close-empty'
                        size={34}
                        color='rgba(255,255,255,0.9)'
                        style={styles.closeIcon}/>
                </TouchableOpacity>
            </Modal>
        )
    }
}


var styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 3,
        margin: 30,
        width: width - 30 * 2
    },
    row: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 2,
        paddingLeft: 20,
        width: width - 30 * 2,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    rowText: {
        paddingLeft: 20,
        color: 'rgba(255,255,255,0.7)'
    },
    logoutText: {
        color: '#E74C3C'
    },
    header: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    Icon: {
        height: 20,
        width: 20
    },
    closeIcon: {
        height: 30,
        width: 30,
        borderRadius: 30 / 2,
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


module.exports = Setting
