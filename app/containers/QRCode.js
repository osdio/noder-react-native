var React = require('react-native')
var Camera = require('react-native-camera')
var { Icon, } = require('react-native-icons')
var Button = require('react-native-button')


var window = require('../util/window')
var { width, height } = window.get()


var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Component,
    Navigator,
    VibrationIOS
    } = React;

var cameraSize = 250
var borderColor = 'rgba(255,255,255,0.6)'
var borderBoxSize = 35

var styles = StyleSheet.create({
    camera: {
        width: width,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        height: 80,
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cameraView: {
        height: cameraSize,
        width: cameraSize,
    },
    container: {
        height: 350
    },
    borderBox: {
        position: 'absolute',
        borderWidth: 2,
        height: borderBoxSize,
        width: borderBoxSize
    },
    borderLeftTop: {
        borderColor: 'transparent',
        borderLeftColor: borderColor,
        borderTopColor: borderColor,
        left: 0,
        top: 0
    },
    borderRightTop: {
        borderColor: 'transparent',
        borderRightColor: borderColor,
        borderTopColor: borderColor,
        right: 0,
        top: 0
    },
    borderLeftBottom: {
        borderColor: 'transparent',
        borderLeftColor: borderColor,
        borderBottomColor: borderColor,
        left: 0,
        bottom: 0
    },
    borderRightBottom: {
        borderColor: 'transparent',
        borderRightColor: borderColor,
        borderBottomColor: borderColor,
        right: 0,
        bottom: 0
    },
    infoText: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 24
    },
    closeButton: {
        width: 35,
        height: 35
    },
    closeIcon: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    buttonWrapper: {
        width: 35,
        height: 35,
        position: 'absolute',
        right: 30,
        top: 0
    }

})


class QRCode extends Component {
    constructor(props) {
        super(props)
        this.succesed = false
    }

    _onBarCodeRead(result) {
        if (this.succesed) return

        var self = this
        self.succesed = true
        VibrationIOS.vibrate()
        this.props.actions.checkToken(result.data, this.props.router)
    }

    _onClosePress() {
        this.props.router.pop()
    }

    render() {
        return (
            <View>
                <Camera
                    ref='camera'
                    style={styles.camera}
                    onBarCodeRead={this._onBarCodeRead.bind(this)}
                    >

                    <View style={styles.header}>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={this._onClosePress.bind(this)}
                                style={styles.closeButton}>
                                <Icon
                                    name='ion|ios-close-empty'
                                    size={40}
                                    color='rgba(255,255,255,0.7)'
                                    style={styles.closeIcon}/>
                            </Button>
                        </View>
                    </View>


                    <View style={styles.container}>
                        <View style={styles.cameraViewWrapper}>
                            <View style={styles.cameraView}>
                                <View style={[styles.borderLeftTop,styles.borderBox]}></View>
                                <View style={[styles.borderRightTop,styles.borderBox]}></View>
                                <View style={[styles.borderLeftBottom,styles.borderBox]}></View>
                                <View style={[styles.borderRightBottom,styles.borderBox]}></View>
                            </View>
                            <Text style={styles.infoText}>
                                请将二维码放到框内
                            </Text>
                        </View>
                    </View>
                </Camera>
            </View>
        )
    }
}


module.exports = QRCode;
