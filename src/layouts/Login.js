import React, {Component} from 'react'
import {
	Platform,
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	Dimensions,
	Image,
	TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

if (Platform.OS !== 'web') {
  var Camera = require('react-native-camera').default
}

import Spinner from '../components/base/Spinner'
import packageObj from '../../package.json'

const {height, width} = Dimensions.get('window')

class Login extends Component {
  _onLoginPress () {
    const {ui, router, actions} = this.props
    if (ui.checkTokenPending) { return }
    if (Platform.OS !== 'web') {
      Platform.OS === 'android' ? router.toQRCode() : Camera.checkDeviceAuthorizationStatus()
        .then((isAuth) => {
          if (isAuth) {
            router.toQRCode()
          } else {
            actions.toast('请在设置中开启Noder对相机的访问')
          }
        })
        .catch(() => {
          actions.toast('获取相机访问权错误')
        })
    }
  }

  _renderLoginButton () {
    if (this.props.ui.checkTokenPending) {
      return (
        <Spinner
          size='small'
          animating
          color='white'
          style={styles.loading} />
      )
    }
    return (
      <Icon.Button
        onPress={this._onLoginPress.bind(this)}
        backgroundColor='#3498DB'
        name='ios-camera'
        size={28}
        style={styles.iconButton}>
        <Text style={styles.iconButtonText}>扫码登陆</Text>
      </Icon.Button>
    )
  }

  render () {
    const {router} = this.props

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => router.pop()} style={styles.closeIcon}>
          <Icon size={40} color='rgba(255,255,255,0.5)' name='ios-close' />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.info}>
            <Image style={styles.img} source={require('../images/noderIcon.png')} />
            <Text style={styles.infoText}>
							国内最专业的 Node.js 开源技术社区
						</Text>
            <Text style={styles.versionText}>
							Version: {packageObj.version}
            </Text>
          </View>
        </View>
        {this._renderLoginButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    backgroundColor: '#292829'
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 400
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoText: {
    color: 'rgba(255,255,255,0.5)'
  },
  versionText: {
    marginTop: 20,
    color: 'rgba(255,255,255,0.5)'
  },
  iconButton: {
    paddingRight: 30,
    paddingLeft: 30
  },
  iconButtonText: {
    color: 'rgba(255,255,255,0.9)'
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 40
  },
  img: {
    width: 100,
    height: 100
  }
})

export const LayoutComponent = Login
export function mapStateToProps (state) {
  return {
    ui: state.userUI
  }
}
