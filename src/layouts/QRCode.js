import React, {Component} from 'react'
import {StyleSheet, View, Text, Dimensions, Platform, TouchableOpacity, Vibration} from 'react-native'

if (Platform.OS !== 'web') {
  var Camera = require('react-native-camera').default
  var BarcodeScanner = require('react-native-barcodescanner')
}

import Icon from 'react-native-vector-icons/Ionicons'
import OverlayButton from '../components/base/OverlayButton'

const {height, width} = Dimensions.get('window')
const cameraSize = 250
const borderColor = 'rgba(255,255,255,0.6)'
const borderBoxSize = 35

class QRCode extends Component {
  constructor (props) {
    super(props)
    this.succesed = false
  }

  _onBarCodeRead (result) {
    const {router, actions} = this.props
    if (this.succesed) { return }

    this.succesed = true
    Vibration.vibrate()
    actions.checkToken(result.data, () => {
      router.pop()
      actions.toast('登陆成功')
    })
    router.pop()
  }

  _onClosePress () {
    this.props.router.pop()
  }

  render () {
    const closeIcon = (
      <OverlayButton
        position={{ right: 60, top: 60 }}
        onPress={this._onClosePress.bind(this)}>
        <View style={styles.iconWrapper}>
          <Icon
            name='ios-close'
            size={40}
            color='rgba(255,255,255,0.7)'
            style={styles.closeIcon} />
        </View>
      </OverlayButton>
		)

		// for web
    if (Platform.OS === 'web') {
      return (
        <View style={styles.camera}>
          <Text style={styles.infoText}>
						只有原生 APP 才支持二维码
					</Text>
        </View>
      )
    }

		// for android
    if (Platform.OS === 'android') {
      return (
        <View style={styles.cameraWrapper}>
          <BarcodeScanner
            onBarCodeRead={this._onBarCodeRead.bind(this)}
            style={styles.camera} />
          { closeIcon }
        </View>
      )
    }

		// for ios
    return (
      <Camera
        ref='camera'
        style={styles.camera}
        aspect={Camera.constants.Aspect.Fill}
        onBarCodeRead={this._onBarCodeRead.bind(this)}>
        <View style={styles.container}>
          <View style={styles.cameraView}>
            <View key='1' style={[styles.borderLeftTop, styles.borderBox]} />
            <View key='2' style={[styles.borderRightTop, styles.borderBox]} />
            <View key='3' style={[styles.borderLeftBottom, styles.borderBox]} />
            <View key='4' style={[styles.borderRightBottom, styles.borderBox]} />
          </View>
          <Text style={styles.infoText}>
						请将二维码放到框内
					</Text>
        </View>
        { closeIcon }
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  cameraWrapper: {
    width,
    height
  },
  camera: {
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraView: {
    height: cameraSize,
    width: cameraSize
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
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45
  },
  closeIcon: {
    flex: 1,
    textAlign: 'center'
  },
  buttonWrapper: {
    width: 35,
    height: 35,
    position: 'absolute',
    right: 30,
    top: 0
  }
})

export const LayoutComponent = QRCode
